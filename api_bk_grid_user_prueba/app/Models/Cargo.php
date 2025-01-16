<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    /** @use HasFactory<\Database\Factories\CargoFactory> */
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'idCargo';
    protected $fillable = [
        'idCargo',
        'codigo',
        'nombre',
        'activo',
        'idUsuarioCreacion',
    ];
    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}
