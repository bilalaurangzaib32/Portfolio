Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\Code\one page website\assets\Gemini_Generated_Image_ai74q2ai74q2ai74.jpg")
$width = $src.Width
$height = $src.Height

# Create 32-bit ARGB bitmap
$dst = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color is around (230, 230, 232)
# We can do BFS flood fill from outside
$visited = New-Object 'bool[,]' $width, $height
$queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Push all boundary pixels that match background
function IsBg($r, $g, $b) {
    # background is very neutral grey around 225-235
    $diffR = [Math]::Abs($r - 230)
    $diffG = [Math]::Abs($g - 230)
    $diffB = [Math]::Abs($b - 232)
    $dist = [Math]::Sqrt($diffR*$diffR + $diffG*$diffG + $diffB*$diffB)
    return ($dist -lt 30)
}

function BgDistance($r, $g, $b) {
    $diffR = [Math]::Abs($r - 230)
    $diffG = [Math]::Abs($g - 230)
    $diffB = [Math]::Abs($b - 232)
    return [Math]::Sqrt($diffR*$diffR + $diffG*$diffG + $diffB*$diffB)
}

# Seed top edge and upper left/right
for ($x = 0; $x -lt $width; $x++) {
    $c = $src.GetPixel($x, 0)
    if (IsBg $c.R $c.G $c.B) {
        $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
        $visited[$x, 0] = $true
    }
}
for ($y = 0; $y -lt [int]($height * 0.7); $y++) {
    $c1 = $src.GetPixel(0, $y)
    if (IsBg $c1.R $c1.G $c1.B -and -not $visited[0, $y]) {
        $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
        $visited[0, $y] = $true
    }
    $c2 = $src.GetPixel($width - 1, $y)
    if (IsBg $c2.R $c2.G $c2.B -and -not $visited[$width - 1, $y]) {
        $queue.Enqueue((New-Object System.Drawing.Point($width - 1, $y)))
        $visited[$width - 1, $y] = $true
    }
}

$dx = @(0, 0, 1, -1)
$dy = @(1, -1, 0, 0)

while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $px = $pt.X
    $py = $pt.Y

    for ($i = 0; $i -lt 4; $i++) {
        $nx = $px + $dx[$i]
        $ny = $py + $dy[$i]
        if ($nx -ge 0 -and $nx -lt $width -and $ny -ge 0 -and $ny -lt $height) {
            if (-not $visited[$nx, $ny]) {
                $col = $src.GetPixel($nx, $ny)
                if (IsBg $col.R $col.G $col.B) {
                    $visited[$nx, $ny] = $true
                    $queue.Enqueue((New-Object System.Drawing.Point($nx, $ny)))
                }
            }
        }
    }
}

# Now copy src to dst with alpha feathered on visited edge
for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $c = $src.GetPixel($x, $y)
        if ($visited[$x, $y]) {
            # calculate distance to give subtle feathering near subject
            $dist = BgDistance $c.R $c.G $c.B
            if ($dist -gt 18) {
                # transitional edge
                $alpha = [int]([Math]::Min(255, [Math]::Max(0, ($dist - 18) * 20)))
                $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
            } else {
                $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            }
        } else {
            $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
        }
    }
}

$dst.Save("d:\Code\one page website\assets\hero-portrait.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()
$src.Dispose()
Write-Output "Successfully saved hero-portrait.png"
