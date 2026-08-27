"""Build the Mitochondria and Immunity series as a print-ready PDF."""

from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from datetime import date
from io import BytesIO
from pathlib import Path

import yaml
from fontTools.ttLib import TTFont as FontToolsTTFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as ReportLabTTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "content" / "stories" / "mitochondria"
DEFAULT_OUTPUT = ROOT / "output" / "pdf" / "mitochondria-and-immunity.pdf"
REGULAR_FONT = ROOT / "public" / "fonts" / "Pretendard-Regular.subset.woff2"
BOLD_FONT = ROOT / "public" / "fonts" / "Pretendard-Bold.subset.woff2"

NAVY = colors.HexColor("#173B4D")
TEAL = colors.HexColor("#287C74")
INK = colors.HexColor("#243238")
MUTED = colors.HexColor("#637279")
PALE_TEAL = colors.HexColor("#EEF6F4")
PALE_BLUE = colors.HexColor("#F3F7F9")
LINE = colors.HexColor("#CBD9DD")


@dataclass
class Chapter:
    order: int
    title: str
    description: str
    updated: str
    slug: str
    body: str


class MitochondriaBook(BaseDocTemplate):
    def __init__(self, filename: str, **kwargs):
        super().__init__(filename, **kwargs)
    def afterFlowable(self, flowable):
        if not isinstance(flowable, Paragraph):
            return
        if flowable.style.name != "ChapterTitle":
            return

        key = flowable._bookmark_key
        title = flowable.getPlainText()
        self.canv.bookmarkPage(key)
        self.canv.addOutlineEntry(title, key, level=0, closed=False)
        self.notify("TOCEntry", (0, title, self.page - 1, key))


def decode_woff2(source: Path) -> BytesIO:
    font = FontToolsTTFont(source)
    font.flavor = None
    buffer = BytesIO()
    font.save(buffer)
    font.close()
    buffer.seek(0)
    return buffer


def register_fonts() -> None:
    missing = [str(path) for path in (REGULAR_FONT, BOLD_FONT) if not path.exists()]
    if missing:
        raise FileNotFoundError(
            "Pretendard font files are missing: " + ", ".join(missing)
        )
    regular = decode_woff2(REGULAR_FONT)
    bold = decode_woff2(BOLD_FONT)
    pdfmetrics.registerFont(ReportLabTTFont("Pretendard", regular))
    pdfmetrics.registerFont(ReportLabTTFont("Pretendard-Bold", bold))
    pdfmetrics.registerFontFamily(
        "Pretendard",
        normal="Pretendard",
        bold="Pretendard-Bold",
        italic="Pretendard",
        boldItalic="Pretendard-Bold",
    )


def parse_chapter(path: Path) -> Chapter:
    raw = path.read_text(encoding="utf-8")
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", raw, re.DOTALL)
    if not match:
        raise ValueError(f"Frontmatter not found: {path}")
    metadata = yaml.safe_load(match.group(1))
    series = metadata.get("series") or {}
    return Chapter(
        order=int(series["order"]),
        title=str(metadata["title"]),
        description=str(metadata.get("description", "")),
        updated=str(metadata.get("updated") or metadata.get("date") or ""),
        slug=str(metadata["slug"]),
        body=match.group(2).strip(),
    )


def load_chapters() -> list[Chapter]:
    chapters = sorted(
        (parse_chapter(path) for path in SOURCE_DIR.glob("*.mdx")),
        key=lambda chapter: chapter.order,
    )
    orders = [chapter.order for chapter in chapters]
    expected = list(range(1, len(chapters) + 1))
    if orders != expected:
        raise ValueError(f"Series order must be consecutive: {orders}")
    return chapters


def load_content_index() -> dict[str, tuple[str, str]]:
    index: dict[str, tuple[str, str]] = {}
    for path in (ROOT / "content").rglob("*.mdx"):
        raw = path.read_text(encoding="utf-8")
        match = re.match(r"^---\s*\n(.*?)\n---", raw, re.DOTALL)
        if not match:
            continue
        metadata = yaml.safe_load(match.group(1)) or {}
        slug = metadata.get("slug")
        title = metadata.get("title")
        relative = path.relative_to(ROOT / "content")
        section = relative.parts[0] if relative.parts else ""
        if slug and title and section in {"docs", "stories", "blog"}:
            index[str(slug)] = (str(title), f"/{section}")
    return index


def inline_markup(text: str) -> str:
    escaped = html.escape(text, quote=False)
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escaped)
    escaped = re.sub(r"(?<!\w)_(.+?)_(?!\w)", r"<i>\1</i>", escaped)
    escaped = re.sub(r"`(.+?)`", r'<font color="#235F68">\1</font>', escaped)

    url_pattern = re.compile(r"(?<![\"'=])(https?://[^\s<]+)")

    def linkify(match: re.Match[str]) -> str:
        url = match.group(1)
        trailing = ""
        while url and url[-1] in ".,;":
            trailing = url[-1] + trailing
            url = url[:-1]
        return f'<link href="{url}" color="#287C74">{url}</link>{trailing}'

    return url_pattern.sub(linkify, escaped)


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "CoverKicker": ParagraphStyle(
            "CoverKicker",
            parent=base["Normal"],
            fontName="Pretendard-Bold",
            fontSize=11,
            leading=16,
            textColor=TEAL,
            alignment=TA_CENTER,
            spaceAfter=12,
        ),
        "CoverTitle": ParagraphStyle(
            "CoverTitle",
            parent=base["Title"],
            fontName="Pretendard-Bold",
            fontSize=30,
            leading=42,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=20,
        ),
        "CoverSubtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=base["Normal"],
            fontName="Pretendard",
            fontSize=12.5,
            leading=21,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "BookTitle": ParagraphStyle(
            "BookTitle",
            parent=base["Heading1"],
            fontName="Pretendard-Bold",
            fontSize=22,
            leading=31,
            textColor=NAVY,
            spaceAfter=18,
        ),
        "Preface": ParagraphStyle(
            "Preface",
            parent=base["BodyText"],
            fontName="Pretendard",
            fontSize=10.5,
            leading=18,
            textColor=INK,
            spaceAfter=10,
        ),
        "ChapterNumber": ParagraphStyle(
            "ChapterNumber",
            parent=base["Normal"],
            fontName="Pretendard-Bold",
            fontSize=10,
            leading=14,
            textColor=TEAL,
            spaceAfter=7,
        ),
        "ChapterTitle": ParagraphStyle(
            "ChapterTitle",
            parent=base["Heading1"],
            fontName="Pretendard-Bold",
            fontSize=21,
            leading=30,
            textColor=NAVY,
            spaceAfter=12,
            keepWithNext=True,
        ),
        "Description": ParagraphStyle(
            "Description",
            parent=base["BodyText"],
            fontName="Pretendard",
            fontSize=10.5,
            leading=18,
            textColor=MUTED,
            backColor=PALE_BLUE,
            borderColor=LINE,
            borderWidth=0.6,
            borderPadding=(9, 11, 9, 11),
            spaceAfter=20,
        ),
        "Heading2": ParagraphStyle(
            "Heading2",
            parent=base["Heading2"],
            fontName="Pretendard-Bold",
            fontSize=14.2,
            leading=21,
            textColor=NAVY,
            spaceBefore=16,
            spaceAfter=8,
            keepWithNext=True,
        ),
        "Heading3": ParagraphStyle(
            "Heading3",
            parent=base["Heading3"],
            fontName="Pretendard-Bold",
            fontSize=11.5,
            leading=18,
            textColor=TEAL,
            spaceBefore=12,
            spaceAfter=6,
            keepWithNext=True,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Pretendard",
            fontSize=10.2,
            leading=17.2,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=8,
            splitLongWords=True,
            allowWidows=0,
            allowOrphans=0,
        ),
        "List": ParagraphStyle(
            "List",
            parent=base["BodyText"],
            fontName="Pretendard",
            fontSize=10,
            leading=16.5,
            textColor=INK,
            leftIndent=2,
            spaceAfter=3,
            splitLongWords=True,
        ),
        "Reference": ParagraphStyle(
            "Reference",
            parent=base["BodyText"],
            fontName="Pretendard",
            fontSize=8.3,
            leading=12.8,
            textColor=colors.HexColor("#4E5D63"),
            leftIndent=0,
            spaceAfter=4,
            splitLongWords=True,
        ),
        "Flow": ParagraphStyle(
            "Flow",
            parent=base["BodyText"],
            fontName="Pretendard-Bold",
            fontSize=9.4,
            leading=16,
            textColor=colors.HexColor("#205F5A"),
            alignment=TA_CENTER,
            splitLongWords=True,
        ),
        "Related": ParagraphStyle(
            "Related",
            parent=base["BodyText"],
            fontName="Pretendard",
            fontSize=8.8,
            leading=14,
            textColor=MUTED,
            leftIndent=8,
            borderColor=LINE,
            borderWidth=0,
            borderLeftWidth=2,
            borderPadding=6,
            spaceAfter=9,
        ),
        "Meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Pretendard",
            fontSize=8,
            leading=12,
            textColor=MUTED,
            spaceAfter=16,
        ),
    }


def flow_box(text: str, style: ParagraphStyle, width: float) -> Table:
    table = Table([[Paragraph(inline_markup(text), style)]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_TEAL),
                ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#A9CEC9")),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    table.spaceBefore = 4
    table.spaceAfter = 11
    return table


def article_link(
    line: str,
    style: ParagraphStyle,
    content_index: dict[str, tuple[str, str]],
) -> Paragraph | None:
    slug_match = re.search(r'slug="([^"]+)"', line)
    if not slug_match:
        return None
    slug = slug_match.group(1)
    label_match = re.search(r'label="([^"]+)"', line)
    base_match = re.search(r'basePath="([^"]+)"', line)
    label = label_match.group(1) if label_match else "관련 글"
    resolved = content_index.get(slug)
    title = resolved[0] if resolved else slug
    base_path = resolved[1] if resolved else (
        base_match.group(1) if base_match else "/docs"
    )
    url = f"https://immunecube.com{base_path}/{slug}"
    return Paragraph(
        f'{html.escape(label)} · <link href="{url}" color="#287C74">'
        f'{html.escape(title)}</link>',
        style,
    )


def body_flowables(
    chapter: Chapter,
    styles: dict[str, ParagraphStyle],
    content_width: float,
    content_index: dict[str, tuple[str, str]],
) -> list:
    items: list = []
    lines = chapter.body.splitlines()
    paragraph_lines: list[str] = []
    list_lines: list[tuple[str, str]] = []
    in_references = False

    def flush_paragraph() -> None:
        nonlocal paragraph_lines
        if not paragraph_lines:
            return
        text = " ".join(part.strip() for part in paragraph_lines).strip()
        if text:
            style = styles["Reference"] if in_references else styles["Body"]
            items.append(Paragraph(inline_markup(text), style))
        paragraph_lines = []

    def flush_list() -> None:
        nonlocal list_lines
        if not list_lines:
            return
        ordered = list_lines[0][0] == "number"
        style = styles["Reference"] if in_references else styles["List"]
        bullets = [
            ListItem(Paragraph(inline_markup(text), style), leftIndent=10)
            for _, text in list_lines
        ]
        items.append(
            ListFlowable(
                bullets,
                bulletType="1" if ordered else "bullet",
                start="1",
                leftIndent=17,
                bulletFontName="Pretendard",
                bulletFontSize=8.5,
                bulletColor=MUTED,
                spaceAfter=7,
            )
        )
        list_lines = []

    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            flush_paragraph()
            flush_list()
            continue

        heading = re.match(r"^(#{2,3})\s+(.+)$", line)
        if heading:
            flush_paragraph()
            flush_list()
            level, title = heading.groups()
            in_references = "참고문헌" in title
            items.append(
                Paragraph(
                    inline_markup(title),
                    styles["Heading2" if level == "##" else "Heading3"],
                )
            )
            continue

        flow = re.match(r'<InlineFlow\s+text="([^"]+)"\s*/>', line)
        if flow:
            flush_paragraph()
            flush_list()
            items.append(flow_box(flow.group(1), styles["Flow"], content_width))
            continue

        if line.startswith("<ArticleLink"):
            flush_paragraph()
            flush_list()
            related = article_link(line, styles["Related"], content_index)
            if related:
                items.append(related)
            continue

        numbered = re.match(r"^\d+\.\s+(.+)$", line)
        bullet = re.match(r"^[-*]\s+(.+)$", line)
        if numbered or bullet:
            flush_paragraph()
            kind = "number" if numbered else "bullet"
            text = (numbered or bullet).group(1)
            if list_lines and list_lines[-1][0] != kind:
                flush_list()
            list_lines.append((kind, text))
            continue

        if line.startswith(">"):
            flush_paragraph()
            flush_list()
            quote = line.lstrip("> ")
            items.append(Paragraph(inline_markup(quote), styles["Related"]))
            continue

        paragraph_lines.append(line)

    flush_paragraph()
    flush_list()
    return items


def draw_cover(canvas, doc) -> None:
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 18 * mm, width, 18 * mm, fill=1, stroke=0)
    canvas.setFillColor(TEAL)
    canvas.rect(0, 0, width, 8 * mm, fill=1, stroke=0)
    canvas.restoreState()


def draw_body_page(canvas, doc) -> None:
    canvas.saveState()
    width, height = A4
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.4)
    canvas.line(doc.leftMargin, height - 14 * mm, width - doc.rightMargin, height - 14 * mm)
    canvas.setFont("Pretendard", 7.6)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, height - 11 * mm, "미토콘드리아와 면역")
    canvas.drawRightString(width - doc.rightMargin, 10 * mm, str(doc.page - 1))
    canvas.restoreState()


def build_pdf(
    chapters: list[Chapter],
    output: Path,
    content_index: dict[str, tuple[str, str]],
) -> None:
    register_fonts()
    styles = make_styles()
    output.parent.mkdir(parents=True, exist_ok=True)

    left = right = 20 * mm
    top = 21 * mm
    bottom = 18 * mm
    content_width = A4[0] - left - right
    content_height = A4[1] - top - bottom

    doc = MitochondriaBook(
        str(output),
        pagesize=A4,
        leftMargin=left,
        rightMargin=right,
        topMargin=top,
        bottomMargin=bottom,
        title="미토콘드리아와 면역",
        author="ImmuneCube",
        subject="미토콘드리아 항상성과 면역대사를 다룬 14편의 연재 글",
    )
    frame = Frame(left, bottom, content_width, content_height, id="body")
    doc.addPageTemplates(
        [
            PageTemplate(id="Cover", frames=[frame], onPage=draw_cover),
            PageTemplate(id="Body", frames=[frame], onPage=draw_body_page),
        ]
    )

    story: list = [
        Spacer(1, 50 * mm),
        Paragraph("IMMUNECUBE SCIENCE SERIES", styles["CoverKicker"]),
        Paragraph("미토콘드리아와 면역", styles["CoverTitle"]),
        Paragraph(
            "세포의 에너지 대사에서 염증, 노화, 만성질환과 회복 전략까지",
            styles["CoverSubtitle"],
        ),
        Spacer(1, 72 * mm),
        Paragraph(
            f"ImmuneCube · {date.today().isoformat()}", styles["CoverKicker"]
        ),
        NextPageTemplate("Body"),
        PageBreak(),
        Paragraph("이 책에 대하여", styles["BookTitle"]),
        Paragraph(
            "미토콘드리아는 ATP를 만드는 기관을 넘어 영양 상태와 세포 스트레스, "
            "면역 신호와 세포 사멸을 연결합니다. 이 책은 ImmuneCube의 ‘미토콘드리아와 "
            "면역’ 연재 14편을 한 권으로 묶어, 기본 원리에서 질환별 작동기전과 생활·치료 "
            "전략까지 순서대로 읽을 수 있도록 구성했습니다.",
            styles["Preface"],
        ),
        Paragraph(
            "각 장의 참고문헌과 관련 글 링크는 원문에 따라 유지했습니다. 의학적 진단이나 "
            "개인 치료를 대신하는 자료가 아니며, 건강 문제와 치료 결정은 의료전문가와 "
            "상의해야 합니다.",
            styles["Preface"],
        ),
        Spacer(1, 8 * mm),
        Paragraph("목차", styles["BookTitle"]),
    ]

    toc = TableOfContents()
    toc.levelStyles = [
        ParagraphStyle(
            "TOCChapter",
            fontName="Pretendard",
            fontSize=10.2,
            leading=18,
            textColor=INK,
            leftIndent=0,
            firstLineIndent=0,
            spaceBefore=3,
        )
    ]
    toc.dotsMinLevel = 0
    story.extend([toc, PageBreak()])

    for index, chapter in enumerate(chapters):
        if index:
            story.append(PageBreak())
        story.extend(
            [
                Paragraph(f"CHAPTER {chapter.order:02d}", styles["ChapterNumber"]),
                chapter_title := Paragraph(
                    inline_markup(chapter.title), styles["ChapterTitle"]
                ),
                Paragraph(
                    f'업데이트 {chapter.updated} · <link href="https://immunecube.com/stories/'
                    f'{chapter.slug}" color="#287C74">웹에서 읽기</link>',
                    styles["Meta"],
                ),
                Paragraph(inline_markup(chapter.description), styles["Description"]),
            ]
        )
        chapter_title._bookmark_key = f"chapter-{chapter.order}"
        story.extend(
            body_flowables(chapter, styles, content_width, content_index)
        )

    doc.multiBuild(story)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help=f"Output PDF path (default: {DEFAULT_OUTPUT})",
    )
    args = parser.parse_args()
    output = args.output.resolve()
    chapters = load_chapters()
    content_index = load_content_index()
    build_pdf(chapters, output, content_index)
    print(f"Created {output} ({len(chapters)} chapters)")


if __name__ == "__main__":
    main()
