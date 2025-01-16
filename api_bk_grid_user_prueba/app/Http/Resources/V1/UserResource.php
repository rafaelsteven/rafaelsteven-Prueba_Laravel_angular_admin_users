<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idUser' => $this->idUser,
            'usuario' => $this->usuario,
            'email' => $this->email,
            'primerNombre' => $this->primerNombre,
            'segundoNombre' => $this->segundoNombre,
            'primerApellido' => $this->primerApellido,
            'segundoApellido' => $this->segundoApellido,
            'cargo' => [
                'idCargo' => $this->cargo->idCargo,
                'codigo' => $this->cargo->codigo,
                'nombre' => $this->cargo->nombre,
                'activo' => $this->cargo->activo],
            'departamento' => [
                'idDepartamento' => $this->departamento->idDepartamento,
                'codigo' => $this->departamento->codigo,
                'nombre' => $this->departamento->nombre,
                'activo' => $this->departamento->activo
            ],
            'estado' => $this->estado
        ];
    }
}
