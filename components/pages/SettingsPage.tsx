import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Shield, Smartphone, Globe, CircleHelp as HelpCircle, LogOut, ChevronLeft, Moon, Zap, Key } from 'lucide-react-native';
import { ApiKeyConfig } from '@/components/ApiKeyConfig';

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoScan, setAutoScan] = useState(false);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleApiKeySet = (newApiKey: string) => {
    setApiKey(newApiKey);
    setShowApiKeyModal(false);
    // Here you would typically save to secure storage
  };

  const settingsSections = [
    {
      title: 'الحساب',
      items: [
        { icon: User, label: 'إعدادات الملف الشخصي', hasArrow: true },
        { icon: Shield, label: 'الخصوصية والأمان', hasArrow: true },
        { icon: Bell, label: 'الإشعارات', toggle: notifications, onToggle: setNotifications },
      ]
    },
    {
      title: 'الذكاء الاصطناعي',
      items: [
        { icon: Key, label: 'إعداد مفتاح OpenAI API', hasArrow: true, onPress: () => setShowApiKeyModal(true) },
        { icon: Zap, label: 'وضع الدقة العالية', toggle: highAccuracy, onToggle: setHighAccuracy },
        { icon: Smartphone, label: 'فحص الروابط تلقائياً', toggle: autoScan, onToggle: setAutoScan },
      ]
    },
    {
      title: 'التطبيق',
      items: [
        { icon: Moon, label: 'الوضع المظلم', toggle: darkMode, onToggle: setDarkMode },
        { icon: Globe, label: 'إعدادات اللغة', hasArrow: true },
      ]
    },
    {
      title: 'الدعم',
      items: [
        { icon: HelpCircle, label: 'المساعدة والأسئلة الشائعة', hasArrow: true },
        { icon: Globe, label: 'حول TEKRONYX', hasArrow: true },
      ]
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>الإعدادات</Text>
          <Text style={styles.subtitle}>تخصيص تجربة التحقق من الأخبار المزيفة</Text>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>ترقية</Text>
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>حساب المستخدم</Text>
              <Text style={styles.userEmail}>user@example.com</Text>
              <Text style={styles.userPlan}>خطة مجانية • 247 تحليل هذا الشهر</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>م</Text>
            </View>
          </View>
        </View>

        {/* API Key Status */}
        <View style={styles.apiStatusCard}>
          <View style={styles.apiStatusContent}>
            <Text style={styles.apiStatusTitle}>حالة الذكاء الاصطناعي</Text>
            <Text style={[
              styles.apiStatusText,
              { color: apiKey ? '#10B981' : '#EF4444' }
            ]}>
              {apiKey ? 'متصل ومفعل' : 'غير مفعل - يتطلب مفتاح API'}
            </Text>
          </View>
          <View style={[
            styles.apiStatusIndicator,
            { backgroundColor: apiKey ? '#10B981' : '#EF4444' }
          ]} />
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsGroup}>
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity 
                    key={itemIndex} 
                    style={[
                      styles.settingItem,
                      itemIndex === section.items.length - 1 && styles.lastItem
                    ]}
                    disabled={item.toggle !== undefined && !item.onPress}
                    onPress={item.onPress}
                  >
                    <View style={styles.settingRight}>
                      {item.toggle !== undefined ? (
                        <Switch
                          value={item.toggle}
                          onValueChange={item.onToggle}
                          trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                          thumbColor={item.toggle ? '#FFFFFF' : '#9CA3AF'}
                        />
                      ) : item.hasArrow ? (
                        <ChevronLeft size={20} color="#9CA3AF" />
                      ) : null}
                    </View>
                    
                    <View style={styles.settingLeft}>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      <View style={styles.iconContainer}>
                        <IconComponent size={20} color="#10B981" />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Statistics Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>إحصائياتك</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,247</Text>
              <Text style={styles.statLabel}>إجمالي التحليلات</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>89</Text>
              <Text style={styles.statLabel}>الأخبار المزيفة المكتشفة</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>94.8%</Text>
              <Text style={styles.statLabel}>معدل الدقة</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8.7/10</Text>
              <Text style={styles.statLabel}>نقاط الثقة</Text>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>إجراءات الحساب</Text>
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerText}>تسجيل الخروج</Text>
            <LogOut size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>كاشف الأخبار المزيفة TEKRONYX الإصدار 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 TEKRONYX. جميع الحقوق محفوظة.</Text>
        </View>

        {/* API Key Modal */}
        <Modal
          visible={showApiKeyModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowApiKeyModal(false)}
              >
                <Text style={styles.modalCloseText}>إلغاء</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>إعداد مفتاح API</Text>
            </View>
            <ApiKeyConfig
              onApiKeySet={handleApiKeySet}
              currentApiKey={apiKey}
            />
          </SafeAreaView>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'right',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  avatarText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'right',
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'right',
  },
  userPlan: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'right',
  },
  upgradeButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  upgradeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  apiStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  apiStatusContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  apiStatusTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'right',
  },
  apiStatusText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'right',
  },
  apiStatusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'right',
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    textAlign: 'right',
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  dangerZone: {
    marginBottom: 32,
  },
  dangerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginBottom: 12,
    textAlign: 'right',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  dangerText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 4,
    textAlign: 'center',
  },
  appCopyright: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    textAlign: 'right',
  },
  modalCloseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalCloseText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
});