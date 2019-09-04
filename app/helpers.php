<?php

use Illuminate\Support\HtmlString;

/**
 * @param  string  $entryName
 * @return HtmlString
 */
function encore_entry_link_tags(string $entryName): HtmlString
{
    $entryPointsFile = public_path('js/entrypoints.json');

    $jsonResult = json_decode(file_get_contents($entryPointsFile), true);

    if (!array_key_exists('css', $jsonResult['entrypoints'][$entryName])) {
        return null;
    }

    $tags = array_map(function ($item) {
        return '<link rel="stylesheet" href="'.$item.'"/>';
    }, $jsonResult['entrypoints'][$entryName]['css']);

    return new HtmlString(implode('', $tags));
}

/**
 * @param  string  $entryName
 * @return HtmlString
 */
function encore_entry_script_tags(string $entryName): HtmlString
{
    $entryPointsFile = public_path('js/entrypoints.json');

    $jsonResult = json_decode(file_get_contents($entryPointsFile), true);

    if (!array_key_exists('js', $jsonResult['entrypoints'][$entryName])) {
        return null;
    }

    $tags = array_map(function ($item) {
        return '<script src="'.$item.'"></script>';
    }, $jsonResult['entrypoints'][$entryName]['js']);

    return new HtmlString(implode('', $tags));
}
