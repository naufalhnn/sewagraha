import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { AreaChart as AreaChartIcon, BarChart as BarChartIcon, BellDot, Calendar, DollarSign, PieChart as PieChartIcon, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from 'recharts';

interface KpiData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface RevenueData {
  month: string;
  pendapatan: number;
}

interface TopVenueData {
  name: string;
  pemesanan: number;
}

interface StatusData {
  name: string;
  value: number;
  color: string;
}

type DashboardPageProps = {
  kpiData: KpiData[];
  revenueData: RevenueData[];
  topVenuesData: TopVenueData[];
  statusData: StatusData[];
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0 && payload[0].value !== undefined) {
    const value = payload[0].value;

    return (
      <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</p>
        <p className="text-sm text-blue-500">
          Pendapatan:
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
          }).format(value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { kpiData, revenueData, topVenuesData, statusData } = usePage<DashboardPageProps>().props;

  const kpiIcons = [
    <BellDot className="size-6 text-gray-500" />,
    <DollarSign className="size-6 text-gray-500" />,
    <Calendar className="size-6 text-gray-500" />,
    <Users className="size-6 text-gray-500" />,
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <div key={index} className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.title}</p>
                {kpiIcons[index]}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">{kpi.value}</p>

                {kpi.change && (
                  <span
                    className={`text-sm font-semibold ${
                      kpi.changeType === 'positive' ? 'text-green-500' : kpi.changeType === 'negative' ? 'text-red-500' : 'text-gray-500' // fallback untuk 'neutral'
                    }`}
                  >
                    {kpi.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
            <AreaChartIcon className="size-5" />
            Grafik Pendapatan (6 Bulan Terakhir)
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200/80 dark:stroke-slate-700/80" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${new Intl.NumberFormat('id-ID').format(value / 1_000_000)} Jt`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} />
                <Line
                  type="monotone"
                  dataKey="pendapatan"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <BarChartIcon className="size-5" />
              Gedung Paling Populer
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topVenuesData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-slate-200/50 dark:stroke-slate-700/50" />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={110} tickLine={false} axisLine={false} fontSize={12} className="dark:fill-slate-400" />
                  <Tooltip cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} />
                  <Bar dataKey="pemesanan" fill="#818cf8" radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="pemesanan" position="right" className="fill-gray-700 dark:fill-gray-200" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <PieChartIcon className="size-5" />
              Distribusi Status Booking
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} />
                  <Pie data={statusData} cx="50%" cy="50%" labelLine={false} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                    ))}
                  </Pie>
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '14px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
