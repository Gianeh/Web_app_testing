<?php

function generatePoissonDisk($width, $height, $radius, $n) {
    $gridWidth = (int) $width;
    $gridHeight = (int) $height;

    $grid = array_fill(0, $gridHeight, array_fill(0, $gridWidth, null));
    $points = [];
    $active = [];

    function isValidPoint($x, $y, $grid, $gridWidth, $gridHeight, $radius) {
        $i = (int) $x;
        $j = (int) $y;
        $iMin = max($i - 2, 0);
        $jMin = max($j - 2, 0);
        $iMax = min($i + 2, $gridWidth - 1);
        $jMax = min($j + 2, $gridHeight - 1);

        for ($dj = $jMin; $dj <= $jMax; $dj++) {
            for ($di = $iMin; $di <= $iMax; $di++) {
                $point = $grid[$dj][$di];
                if (!is_null($point)) {
                    $dx = $point[0] - $x;
                    $dy = $point[1] - $y;
                    $distanceSquared = $dx * $dx + $dy * $dy;
                    if ($distanceSquared < $radius * $radius) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    function addPoint($x, $y, &$points, &$active, &$grid) {
        $i = (int) $x;
        $j = (int) $y;
        $point = [$x, $y];
        $points[] = $point;
        $active[] = $point;
        $grid[$j][$i] = $point;
    }

    // Generate the first point at (250, 250) or center of the grid
    $firstPoint = [$width / 2, $height / 2];
    addPoint($firstPoint[0], $firstPoint[1], $points, $active, $grid);

    // Main loop
    while (!empty($active) && count($points) < $n) {
        $index = mt_rand(0, count($active) - 1);
        $currentPoint = $active[$index];
        $found = false;

        for ($i = 0; $i < $n; $i++) {
            $angle = 2 * M_PI * mt_rand() / mt_getrandmax();
            $distance = mt_rand($radius, 2 * $radius);
            $newX = $currentPoint[0] + $distance * cos($angle);
            $newY = $currentPoint[1] + $distance * sin($angle);

            if ($newX >= 0 && $newX < $width && $newY >= 0 && $newY < $height && isValidPoint($newX, $newY, $grid, $gridWidth, $gridHeight, $radius)) {
                addPoint($newX, $newY, $points, $active, $grid);
                $found = true;
                break;
            }
        }

        if (!$found) {
            array_splice($active, $index, 1);
        }
    }

    return array_slice($points, 0, $n);
}

function sortPointsByDistance(&$points, $firstPoint) {
    usort($points, function($a, $b) use ($firstPoint) {
        $distanceA = sqrt(($a[0] - $firstPoint[0]) ** 2 + ($a[1] - $firstPoint[1]) ** 2);
        $distanceB = sqrt(($b[0] - $firstPoint[0]) ** 2 + ($b[1] - $firstPoint[1]) ** 2);
        return $distanceA <=> $distanceB;
    });
}
