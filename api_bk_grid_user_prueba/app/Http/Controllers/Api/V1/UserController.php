<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\V1\UserResource;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::with('cargo', 'departamento')->where('estado', 1);
    
        // Aplicar filtros opcionales
        if ($request->has('departamento') && $request->departamento !== 'null' && $request->departamento !== null && $request->departamento !== '') {
            $query->where('idDepartamento', $request->departamento);
        }
    
        if ($request->has('cargo') && $request->cargo !== 'null' && $request->cargo !== null && $request->cargo !== '') {
            $query->where('idCargo', $request->cargo);
        }
    
        // Obtener resultados paginados
        $users = $query->latest()->paginate(30);
    
        return UserResource::collection($users);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usuario = User::where('usuario', $request->usuario)->first();
        if (!empty($usuario)) {
            return response()->json([
                'message' => 'El usuario ya existe',
                'status' => Response::HTTP_CONFLICT], status: Response::HTTP_OK);
        }
        $email = User::where('email', $request->email)->first();
        if (!empty($email)) {
            return response()->json([
                'message' => 'El email ya existe',
                'status' => Response::HTTP_CONFLICT], Response::HTTP_OK);
        }

        $user = User::create($request->all());
        
        return response()->json(['data' =>new UserResource($user),
        'message' => 'El usuario ha sido creado correctamente',
        'status' => Response::HTTP_CREATED], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('cargo', 'departamento')
        ->where('estado', 1)->first();
        response()->json($user);
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        if (empty($user)) {
            return response()->json([
                'message' => 'El usuario no existe',
                'status' => Response::HTTP_CONFLICT], Response::HTTP_OK);
        }
        $usuario = User::where('usuario', $request->usuario)
                        ->where('estado', 1)->first();
        if (!empty($usuario) && $user->idUser != $usuario->idUser) {
            return response()->json([
                'message' => 'El usuario ya existe',
                'status' => Response::HTTP_CONFLICT], Response::HTTP_OK);
        }
        $email = User::where('email', $request->email)
                    ->where('estado', 1)->first();
        if (!empty($email) && $user->idUser != $email->idUser) {
            return response()->json([
                'message' => 'El email ya existe',
                'status' => Response::HTTP_CONFLICT], Response::HTTP_OK);
        }

        $user->update($request->all());
        return response()->json(['data' =>new UserResource($user),
        'message' => 'El usuario ha sido actualizado correctamente',
        'status' => Response::HTTP_CREATED], Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->estado == 1) {
            $user->update(['estado' => 0]);
            $user->save();
            return response()->json(['message' => 'El usuario ha sido eliminado',
            'status' => Response::HTTP_CREATED], Response::HTTP_CREATED);
        } else {
            return response()->json(['message' => 'El usuario no existe',
            'status' => Response::HTTP_NOT_FOUND], Response::HTTP_OK);
        }
    }
}
