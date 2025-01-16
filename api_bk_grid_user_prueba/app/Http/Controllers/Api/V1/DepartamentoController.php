<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Departamento;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DepartamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departamentos = Departamento::all()->where('activo', 1);
        return response()->json(['data'=>$departamentos,'status' => Response::HTTP_OK], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
       
    // }

    /**
     * Display the specified resource.
     */
    public function show(Departamento $departamento)
    {
        if ($departamento->activo !== 1 || $departamento === null) {
            return response()->json([
                'message' => 'El departamento no existe',
                'status' => Response::HTTP_NOT_FOUND,
            ], Response::HTTP_NOT_FOUND);
        }
        return response()->json(['data'=>$departamento,'status' => Response::HTTP_OK], Response::HTTP_OK);;
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Departamento $departamento)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Departamento $departamento)
    // {
    //     //
    // }
}
