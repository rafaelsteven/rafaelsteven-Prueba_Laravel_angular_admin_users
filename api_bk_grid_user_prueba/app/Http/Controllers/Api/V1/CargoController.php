<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Cargo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CargoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cargos = Cargo::all()->where('activo', 1);
        return response()->json(['data'=>$cargos,'status' => Response::HTTP_OK], Response::HTTP_OK);

    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     */
    public function show(Cargo $cargo)
    {
        if ($cargo->activo !== 1 || $cargo === null) {
            return response()->json([
                'message' => 'El cargo no existe',
                'status' => Response::HTTP_NOT_FOUND,
            ], Response::HTTP_NOT_FOUND);
        }
    
        return response()->json([
            'data' => $cargo,
            'status' => Response::HTTP_OK,
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Cargo $cargo)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Cargo $cargo)
    // {
    //     //
    // }
}
