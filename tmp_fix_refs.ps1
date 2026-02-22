$files = Get-ChildItem 'content/docs/imm-classic' -Filter '*.mdx' -File
$changed = @()
foreach($f in $files){
  $lines = Get-Content $f.FullName
  if($lines.Count -lt 5){ continue }

  $lastH2 = -1
  for($i=0; $i -lt $lines.Count; $i++){
    if($lines[$i] -match '^##\s+'){ $lastH2 = $i }
  }
  if($lastH2 -lt 0){ continue }

  $orig = $lines -join "`n"

  for($j = $lastH2 + 1; $j -lt $lines.Count; $j++){
    $line = $lines[$j]
    $line = [regex]::Replace($line, '\*([^*]+)\*', '$1')

    if($line -match '(?i)doi\s*:\s*(10\.\S+)'){
      $doi = $matches[1].TrimEnd('.')
      $line = [regex]::Replace($line, '(?i)doi\s*:\s*10\.\S+', "https://doi.org/$doi")
    }
    if($line -match '(?i)\bDOI\b\s*(10\.\S+)'){
      $doi2 = $matches[1].TrimEnd('.')
      $line = [regex]::Replace($line, '(?i)\bDOI\b\s*10\.\S+', "https://doi.org/$doi2")
    }

    $lines[$j] = $line
  }

  $new = $lines -join "`n"
  if($new -ne $orig){
    Set-Content -Path $f.FullName -Value $new -Encoding UTF8
    $changed += $f.FullName
  }
}
$changed | ConvertTo-Json -Depth 2
