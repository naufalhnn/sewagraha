<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        // Buat Permissions (seperti di atas)
        Permission::create(['name' => 'lihat dashboard']);
        Permission::create(['name' => 'kelola gedung']);
        Permission::create(['name' => 'lihat semua pemesanan']);
        Permission::create(['name' => 'verifikasi pembayaran']);
        Permission::create(['name' => 'buat pemesanan']);
        Permission::create(['name' => 'lihat riwayat pemesanan pribadi']);
        Permission::create(['name' => 'batalkan pemesanan pribadi']);

        $adminRole->givePermissionTo(Permission::all());

        $userRole->givePermissionTo([
            'buat pemesanan',
            'lihat riwayat pemesanan pribadi',
            'batalkan pemesanan pribadi',
        ]);
    }
}
