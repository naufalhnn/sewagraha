<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $startOfMonth = now()->startOfMonth();
        $endOfMonth = now()->endOfMonth();
        $startOfLastMonth = now()->subMonth()->startOfMonth();
        $endOfLastMonth = now()->subMonth()->endOfMonth();

        $calculateChange = function ($current, $previous) {
            if ($previous == 0) return $current > 0 ? '+100%' : '0%';
            $change = (($current - $previous) / $previous) * 100;
            return ($change >= 0 ? '+' : '') . number_format($change, 1) . '%';
        };

        $pendingConfirmationCount = Booking::whereIn('status', [
            'VERIFYING PAYMENT',
            'REQUEST CANCEL'
        ])->count();

        $revenueThisMonth = Booking::whereIn('status', ['CONFIRMED', 'COMPLETED'])->whereBetween('created_at', [$startOfMonth, $endOfMonth])->sum('total_price');
        $revenueLastMonth = Booking::whereIn('status', ['CONFIRMED', 'COMPLETED'])->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->sum('total_price');

        $bookingsThisMonthCount = Booking::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
        $bookingsLastMonthCount = Booking::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        $usersThisMonthCount = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
        $usersLastMonthCount = User::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();


        $kpiData = [
            [
                'title' => 'Menunggu Konfirmasi',
                'value' => number_format($pendingConfirmationCount),
                'change' => null,
                'changeType' => 'neutral',
            ],
            [
                'title' => 'Pendapatan Bulan Ini',
                'value' => 'Rp ' . number_format($revenueThisMonth, 0, ',', '.'),
                'change' => $calculateChange($revenueThisMonth, $revenueLastMonth),
                'changeType' => $revenueThisMonth >= $revenueLastMonth ? 'positive' : 'negative',
            ],
            [
                'title' => 'Pemesanan Baru Bulan Ini',
                'value' => number_format($bookingsThisMonthCount, 0, ',', '.'),
                'change' => $calculateChange($bookingsThisMonthCount, $bookingsLastMonthCount),
                'changeType' => $bookingsThisMonthCount >= $bookingsLastMonthCount ? 'positive' : 'negative',
            ],
            [
                'title' => 'Pengguna Baru Bulan Ini',
                'value' => number_format($usersThisMonthCount, 0, ',', '.'),
                'change' => $calculateChange($usersThisMonthCount, $usersLastMonthCount),
                'changeType' => $usersThisMonthCount >= $usersLastMonthCount ? 'positive' : 'negative',
            ],
        ];

        $sixMonthsAgo = now()->subMonths(5)->startOfMonth();
        $revenueQuery = Booking::select(DB::raw('SUM(total_price) as total_pendapatan'), DB::raw("DATE_FORMAT(created_at, '%b') as bulan"))->whereIn('status', ['CONFIRMED', 'COMPLETED'])->where('created_at', '>=', $sixMonthsAgo)->groupBy('bulan')->orderByRaw("MIN(created_at)")->get()->keyBy('bulan');
        $revenueData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $monthKey = $month->format('M');
            $revenueData[] = ['month' => $monthKey, 'pendapatan' => $revenueQuery[$monthKey]->total_pendapatan ?? 0];
        }

        $topVenuesData = Booking::join('venues', 'bookings.venue_id', '=', 'venues.id')->select('venues.name', DB::raw('count(bookings.id) as pemesanan'))->groupBy('venues.name')->orderBy('pemesanan', 'desc')->limit(5)->get();

        $statusColors = ['CONFIRMED' => '#3b82f6', 'PENDING' => '#f97316', 'CANCELED' => '#ef4444', 'COMPLETED' => '#22c55e', 'WAITING PAYMENT' => '#eab308', 'VERIFYING PAYMENT' => '#14b8a6', 'REQUEST CANCEL' => '#ff6900'];
        $statusData = Booking::select('status', DB::raw('count(*) as value'))->groupBy('status')->get()->map(function ($item) use ($statusColors) {
            $item->name = ucwords(strtolower(str_replace('_', ' ', $item->status)));
            $item->color = $statusColors[$item->getRawOriginal('status')] ?? '#6b7280';
            return $item;
        });

        return Inertia::render('dashboard', [
            'kpiData' => $kpiData,
            'revenueData' => $revenueData,
            'topVenuesData' => $topVenuesData,
            'statusData' => $statusData,
        ]);
    }
}
