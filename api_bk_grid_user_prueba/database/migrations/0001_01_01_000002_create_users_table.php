<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->unsignedBigInteger('idUser')->autoIncrement();
            $table->string('usuario')->unique();
            $table->string('email')->unique();
            $table->string('primerNombre');
            $table->string('segundoNombre')->nullable();
            $table->string('primerApellido');
            $table->string('segundoApellido')->nullable();
            $table->unsignedBigInteger('idDepartamento');
            $table->foreign('idDepartamento')->references('idDepartamento')->on('departamentos')->onDelete('cascade');
            $table->unsignedBigInteger('idCargo');
            $table->foreign('idCargo')->references('idCargo')->on('cargos')->onDelete('cascade');
            $table->boolean('estado');
            $table->timestamps();
        });

        // Relación de cargos con usuarios
        Schema::table('cargos', function (Blueprint $table) {
            $table->unsignedBigInteger('idUsuarioCreacion')->nullable(); // FK
            $table->foreign('idUsuarioCreacion')->references('idUser')->on('users')->onDelete('set null');
        });

        Schema::table('departamentos', function (Blueprint $table) {
            $table->unsignedBigInteger('idUsuarioCreacion')->nullable(); // FK
            $table->foreign('idUsuarioCreacion')->references('idUser')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
