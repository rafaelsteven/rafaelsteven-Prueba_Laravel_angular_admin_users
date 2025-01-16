<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('v1/users', App\Http\Controllers\Api\V1\UserController::class);
Route::apiResource('v1/cargos', App\Http\Controllers\Api\V1\CargoController::class)->only('index', 'show');
Route::apiResource('v1/departamentos', App\Http\Controllers\Api\V1\DepartamentoController::class)->only('index', 'show');