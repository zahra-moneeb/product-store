import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Moon,
  Sun,
  DollarSign,
  Globe,
  Bell,
  Shield,
  User,
  ChevronDown,
  ChevronRight,
  Trash2,
  Download,
  Upload
} from 'lucide-react'
import { setTheme } from '../feature/theme/themeSlice'

const SettingSection = ({ title, icon: Icon, sectionKey, children, expandedSections, toggleSection, theme }) => (
  <div className={`border rounded-2xl overflow-hidden ${
    theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
  }`}>
    <button
      onClick={() => toggleSection(sectionKey)}
      className={`w-full flex items-center justify-between p-6 transition-colors ${
        theme === 'dark'
          ? 'bg-slate-900/50 hover:bg-slate-800/50'
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${
          theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
        }`} />
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{title}</h3>
      </div>
      {expandedSections[sectionKey] ?
        <ChevronDown className={`h-5 w-5 ${
          theme === 'dark' ? 'text-slate-400' : 'text-gray-400'
        }`} /> :
        <ChevronRight className={`h-5 w-5 ${
          theme === 'dark' ? 'text-slate-400' : 'text-gray-400'
        }`} />
      }
    </button>
    {expandedSections[sectionKey] && (
      <div className={`p-6 ${
        theme === 'dark' ? 'bg-slate-950/30' : 'bg-white'
      }`}>
        {children}
      </div>
    )}
  </div>
)

const ToggleSwitch = ({ checked, onChange, label, theme }) => (
  <div className="flex items-center justify-between py-3">
    <span className={theme === 'dark' ? 'text-slate-200' : 'text-gray-700'}>{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked
          ? theme === 'dark' ? 'bg-cyan-500' : 'bg-blue-500'
          : theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
)

const SelectDropdown = ({ value, onChange, options, label, theme }) => (
  <div className="py-3">
    <label className={`block text-sm font-medium mb-2 ${
      theme === 'dark' ? 'text-slate-200' : 'text-gray-700'
    }`}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-700 text-slate-200 focus:ring-cyan-500 focus:border-cyan-500'
          : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
      }`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value} className={
          theme === 'dark' ? 'bg-slate-900' : 'bg-white'
        }>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export default function Setting() {
  const theme = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()
  
  const [settings, setSettings] = useState({
    currency: 'USD',
    language: 'en',
    notifications: {
      email: true,
      push: false,
      sms: false,
      marketing: true
    },
    privacy: {
      profileVisibility: 'public',
      dataSharing: false,
      analytics: true
    }
  })

  const [expandedSections, setExpandedSections] = useState({
    appearance: true,
    currency: false,
    language: false,
    notifications: false,
    privacy: false,
    account: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object'
        ? { ...prev[category], [key]: value }
        : value
    }))
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {/* Header */}
        <div className={`rounded-[2rem] border p-8 shadow-[0_28px_80px_rgba(15,23,42,0.75)] ${
          theme === 'dark'
            ? 'border-slate-800 bg-slate-950/95'
            : 'border-gray-200 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.1)]'
        }`}>
          <h1 className={`text-3xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Settings</h1>
          <p className={`mt-4 ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}>Customize your experience and manage your account preferences.</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Appearance */}
          <SettingSection
            title="Appearance"
            icon={theme === 'dark' ? Moon : Sun}
            sectionKey="appearance"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            theme={theme}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Theme</h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  }`}>Choose your preferred color scheme</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(setTheme('light'))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      theme === 'light'
                        ? theme === 'dark' ? 'bg-cyan-500 text-slate-950' : 'bg-blue-500 text-white'
                        : theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </button>
                  <button
                    onClick={() => dispatch(setTheme('dark'))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      theme === 'dark'
                        ? theme === 'dark' ? 'bg-cyan-500 text-slate-950' : 'bg-blue-500 text-white'
                        : theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </SettingSection>

          {/* Currency */}
          <SettingSection
            title="Currency"
            icon={DollarSign}
            sectionKey="currency"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          >
            <SelectDropdown
              label="Default Currency"
              value={settings.currency}
              onChange={(value) => updateSetting('currency', null, value)}
              options={[
                { value: 'USD', label: 'US Dollar ($)' },
                { value: 'EUR', label: 'Euro (€)' },
                { value: 'GBP', label: 'British Pound (£)' },
                { value: 'JPY', label: 'Japanese Yen (¥)' },
                { value: 'CAD', label: 'Canadian Dollar (C$)' },
                { value: 'AUD', label: 'Australian Dollar (A$)' }
              ]}
            />
          </SettingSection>

          {/* Language */}
          <SettingSection
            title="Language"
            icon={Globe}
            sectionKey="language"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          >
            <SelectDropdown
              label="Display Language"
              value={settings.language}
              onChange={(value) => updateSetting('language', null, value)}
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' },
                { value: 'fr', label: 'Français' },
                { value: 'de', label: 'Deutsch' },
                { value: 'it', label: 'Italiano' },
                { value: 'pt', label: 'Português' }
              ]}
            />
          </SettingSection>

          {/* Notifications */}
          <SettingSection
            title="Notifications"
            icon={Bell}
            sectionKey="notifications"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          >
            <div className="space-y-2">
              <ToggleSwitch
                checked={settings.notifications.email}
                onChange={(value) => updateSetting('notifications', 'email', value)}
                label="Email notifications"
                theme={theme}
              />
              <ToggleSwitch
                checked={settings.notifications.push}
                onChange={(value) => updateSetting('notifications', 'push', value)}
                label="Push notifications"
                theme={theme}
              />
              <ToggleSwitch
                checked={settings.notifications.sms}
                onChange={(value) => updateSetting('notifications', 'sms', value)}
                label="SMS notifications"
                theme={theme}
              />
              <ToggleSwitch
                checked={settings.notifications.marketing}
                onChange={(value) => updateSetting('notifications', 'marketing', value)}
                label="Marketing communications"
                theme={theme}
              />
            </div>
          </SettingSection>

          {/* Privacy */}
          <SettingSection
            title="Privacy"
            icon={Shield}
            sectionKey="privacy"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          >
            <div className="space-y-4">
              <SelectDropdown
                label="Profile Visibility"
                value={settings.privacy.profileVisibility}
                onChange={(value) => updateSetting('privacy', 'profileVisibility', value)}
                options={[
                  { value: 'public', label: 'Public' },
                  { value: 'friends', label: 'Friends Only' },
                  { value: 'private', label: 'Private' }
                ]}
                theme={theme}
              />
              <ToggleSwitch
                checked={settings.privacy.dataSharing}
                onChange={(value) => updateSetting('privacy', 'dataSharing', value)}
                label="Data sharing with partners"
                theme={theme}
              />
              <ToggleSwitch
                checked={settings.privacy.analytics}
                onChange={(value) => updateSetting('privacy', 'analytics', value)}
                label="Analytics and usage tracking"
                theme={theme}
              />
            </div>
          </SettingSection>

          {/* Account */}
          <SettingSection
            title="Account"
            icon={User}
            sectionKey="account"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <button className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-900 hover:bg-slate-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                  <Download className={`h-5 w-5 ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
                  }`} />
                  <div className="text-left">
                    <div className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Export Data</div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                    }`}>Download your data</div>
                  </div>
                </button>
                <button className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-900 hover:bg-slate-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                  <Upload className={`h-5 w-5 ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
                  }`} />
                  <div className="text-left">
                    <div className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Import Data</div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                    }`}>Import your data</div>
                  </div>
                </button>
              </div>
              <div className={`border-t pt-4 ${
                theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
              }`}>
                <button className={`flex items-center gap-3 p-4 border rounded-xl transition-colors w-full ${
                  theme === 'dark'
                    ? 'bg-rose-950/50 border-rose-800/50 hover:bg-rose-900/50'
                    : 'bg-red-50 border-red-200 hover:bg-red-100'
                }`}>
                  <Trash2 className={`h-5 w-5 ${
                    theme === 'dark' ? 'text-rose-400' : 'text-red-500'
                  }`} />
                  <div className="text-left">
                    <div className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Delete Account</div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-rose-400' : 'text-red-600'
                    }`}>Permanently delete your account</div>
                  </div>
                </button>
              </div>
            </div>
          </SettingSection>
        </div>
      </div>
    </main>
  )
}