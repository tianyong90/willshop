<?php

function mixIsUsingHmr()
{
    return file_exists(public_path('/hot'));
}
