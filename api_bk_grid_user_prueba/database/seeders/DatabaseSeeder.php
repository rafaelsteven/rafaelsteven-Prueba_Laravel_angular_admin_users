<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Cargo;
use App\Models\Departamento;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Departamento::factory(10)->create();
        Cargo::factory(10)->create();
        $departamentosActivos = Departamento::where('activo', 1)->pluck('idDepartamento')->toArray();
        $cargosActivos = Cargo::where('activo', 1)->pluck('idCargo')->toArray();

        $usuarios = User::factory(20)->create(
            [
                'idCargo' => function () use ($cargosActivos) {
                    return $cargosActivos[array_rand($cargosActivos)];
                },
                'idDepartamento' => function () use ($departamentosActivos) {
                    return $departamentosActivos[array_rand($departamentosActivos)];
                },
            ]
        );

        $departamentos = Departamento::all();
        $cargos = Cargo::all();

        // Asignar idUsuarioCreacion a los cargos
        $usuariosArray = $usuarios->pluck('idUser')->toArray();
        $usuariosAsignados = 0;
        foreach ($cargos as $cargo) {
            $cargo->idUsuarioCreacion = $usuariosArray[$usuariosAsignados];
            $cargo->save();
            $usuariosAsignados = ($usuariosAsignados + 1) % count($usuariosArray);
        }
        // Asignar idUsuarioCreacion a los departamentos
        $usuariosAsignados = 0;
        foreach ($departamentos as $departamento) {
            $departamento->idUsuarioCreacion = $usuariosArray[$usuariosAsignados];
            $departamento->save();
            $usuariosAsignados = ($usuariosAsignados + 1) % count($usuariosArray);
        }


    }
}
