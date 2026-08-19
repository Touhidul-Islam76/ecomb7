<?php

namespace App\Http\Controllers;

use App\helpers\ResponseTrait;
use App\Traits\FormatUserTrait;

abstract class Controller
{
    use ResponseTrait, FormatUserTrait;
}
