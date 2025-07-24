import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient';
import { BsPeopleFill, BsShieldLockFill } from 'react-icons/bs'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const StatCard = ({ icon, label, value, colorStart, colorEnd }) => (
  <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-start justify-between hover:shadow-xl transition hover:scale-[1.02]">
    <div className="flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-md text-white text-xl"
        style={{
          background: `linear-gradient(to bottom right, ${colorStart}, ${colorEnd})`
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
    <div className="mt-3 w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full" />
    <p className="text-xs text-gray-400 mt-2">📡 Realtime Sync</p>
  </div>
)

export default function DashboardStats() {
  const [memberCount, setMemberCount] = useState(0)
  const [adminCount, setAdminCount] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: members } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })

      const { count: admins } = await supabase
        .from('admins')
        .select('*', { count: 'exact', head: true })

      setMemberCount(members || 0)
      setAdminCount(admins || 0)
    }

    fetchCounts()
  }, [])

  const chartData = [
    { name: 'Member', value: memberCount },
    { name: 'Admin', value: adminCount }
  ]

  const COLORS = ['#00B4DB', '#0083B0'] // Vibrant Blue Gradients

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${chartData[index].name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    )
  }

  return (
    <div className="p-6 font-poppins ml-64 bg-gradient-to-tr from-[#f0f8ff] to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* 🔵 Header Biru Facebook dengan animasi halus */}
        <header className="relative py-6 px-4 rounded-2xl shadow-md border border-blue-200 mb-10 text-center overflow-hidden bg-gradient-to-r from-[#e6f0ff] via-[#d0e4ff] to-[#f0f8ff]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#1877f2]/20 via-white/10 to-[#1877f2]/20 animate-[pulse_6s_infinite]" />
          <h1 className="relative z-10 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1877f2] via-[#60a5fa] to-[#1e3a8a] drop-shadow tracking-wider uppercase animate-pulse">
            📊 Statistik Dashboard
          </h1>
        </header>

        {/* 🟦 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            icon={<BsPeopleFill size={24} />}
            label="Jumlah Member"
            value={memberCount}
            colorStart="#3ae1ff"
            colorEnd="#3aafe3"
          />

          <StatCard
            icon={<BsShieldLockFill size={24} />}
            label="Jumlah Admin"
            value={adminCount}
            colorStart="#c3cfe2"
            colorEnd="#667eea"
          />

          {/* 📊 Pie Chart */}
          <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-blue-100 flex items-center justify-center hover:scale-[1.02] transition">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  labelLine={false}
                  label={renderCustomLabel}
                  isAnimationActive={true}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f0faff',
                    borderColor: '#d0e0ff'
                  }}
                  labelStyle={{
                    color: '#1877f2',
                    fontWeight: 'bold'
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
