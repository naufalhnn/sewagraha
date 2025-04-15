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
        Schema::table('venue_images', function (Blueprint $table) {
            $table->dropForeign(['venue_id']);

            $table->foreign('venue_id')
                ->references('id')
                ->on('venues')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('venue_images', function (Blueprint $table) {
            $table->dropForeign(['venue_id']);

            $table->foreign('venue_id')
                ->references('id')
                ->on('venues');
        });
    }
};
