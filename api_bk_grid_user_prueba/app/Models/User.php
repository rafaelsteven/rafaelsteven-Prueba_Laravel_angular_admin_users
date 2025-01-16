<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    // Si la columna primaria no es 'id', debes especificarlo
    protected $primaryKey = 'idUser';

    protected $fillable = [
        'idUser',
        'usuario',
        'email',
        'primerNombre',
        'segundoNombre',
        'primerApellido',
        'segundoApellido',
        'idDepartamento',
        'idCargo',
        'estado',
    ];
    public function cargo()
    {
        return $this->belongsTo(Cargo::class, 'idCargo', 'idCargo');
    }

    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'idDepartamento', 'idDepartamento');
    }
}
