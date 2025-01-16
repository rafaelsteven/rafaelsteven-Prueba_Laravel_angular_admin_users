<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    /** @use HasFactory<\Database\Factories\DepartamentoFactory> */
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'idDepartamento';
    protected $fillable = [
        'idDepartamento',
        'codigo',
        'nombre',
        'activo',
        'idUsuarioCreacion',
    ];
    public function usuarioCreacion()
    {
        return $this->belongsTo(User::class, 'idUsuarioCreacion');
    }
}
