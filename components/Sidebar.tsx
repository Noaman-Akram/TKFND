import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { 
  ChartBar as BarChart3, 
  ScanLine, 
  Bot,
  History, 
  TrendingUp, 
  Shield, 
  Settings, 
  X,
  Database,
  Search,
  FileText,
  Users,
  Zap,
  Lock,
  Link,
  Sparkles
} from 'lucide-react-native';
import { Image } from 'react-native';
const { width } = Dimensions.get('window');

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  isDesktop: boolean;
}

const navigationItems = [
  { id: 'chat', label: 'الصفحة الرئيسية', icon: Bot, category: 'main' },
  { id: 'overview', label: 'لوحة التحكم', icon: BarChart3, category: 'main' },
  { id: 'scanner', label: 'تحليل سريع', icon: ScanLine, category: 'main' },
  { id: 'history', label: 'سجل التحليل', icon: History, category: 'main' },
  { id: 'analytics', label: 'التحليلات', icon: TrendingUp, category: 'main' },
  { id: 'sources', label: 'المصادر الموثوقة', icon: Shield, category: 'main' },
  
  { id: 'data-sources', label: 'مصادر البيانات', icon: Database, category: 'platform' },
  { id: 'ai-models', label: 'نماذج الذكاء الاصطناعي', icon: Bot, category: 'platform' },
  { id: 'search', label: 'البحث', icon: Search, category: 'platform' },
  { id: 'reports', label: 'التقارير', icon: FileText, category: 'platform' },
  { id: 'collaboration', label: 'التعاون', icon: Users, category: 'platform' },
  { id: 'automation', label: 'الأتمتة', icon: Zap, category: 'platform' },
  { id: 'security', label: 'الأمان', icon: Lock, category: 'platform' },
  { id: 'integrations', label: 'التكاملات', icon: Link, category: 'platform' },
  
  { id: 'settings', label: 'الإعدادات', icon: Settings, category: 'system' },
];

const categories = [
  { id: 'main', label: 'كشف الأخبار المزيفة' },
  { id: 'platform', label: 'منصة الذكاء الاصطناعي' },
  { id: 'system', label: 'النظام' },
];

export function Sidebar({ activeSection, onSectionChange, isOpen, onToggle, isDesktop }: SidebarProps) {
  if (!isOpen) {
    return null;
  }

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    if (!isDesktop) {
      onToggle(); // Close sidebar on mobile/tablet after selection
    }
  };

  return (
    <>
      {!isDesktop && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={onToggle}
          activeOpacity={1}
        />
      )}
      
      <View style={[
        styles.container,
        isDesktop ? styles.containerDesktop : styles.containerMobile
      ]}>
        <View style={styles.header}>
          {!isDesktop && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onToggle}
            >
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
          <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/Black.png')}
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
          />

          </View>
        </View>

        <View style={styles.appTitle}>
          <Text style={styles.appTitleText}>منصة الذكاء الاصطناعي</Text>
          <Text style={styles.appSubtitle}>كشف وتحليل الأخبار المزيفة</Text>
        </View>

        <ScrollView style={styles.navigation} showsVerticalScrollIndicator={false}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category.label}</Text>
              {navigationItems
                .filter(item => item.category === category.id)
                .map((item) => {
                  const isActive = activeSection === item.id;
                  const IconComponent = item.icon;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.navItem,
                        isActive && styles.navItemActive,
                      ]}
                      onPress={() => handleSectionChange(item.id)}
                    >
                      <View style={styles.navItemContent}>
                        <Text style={[
                          styles.navItemText,
                          isActive && styles.navItemTextActive,
                        ]}>
                          {item.label}
                        </Text>
                        <IconComponent
                          size={20}
                          color={isActive ? '#10B981' : '#6B7280'}
                        />
                      </View>
                      {isActive && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                  );
                })}
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.userInfo}>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>مستخدم</Text>
              <Text style={styles.userRole}>محلل</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>م</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  containerDesktop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 300,
    zIndex: 999,
  },
  containerMobile: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: Math.min(300, width * 0.85),
    zIndex: 999,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  brandText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    letterSpacing: 1.2,
    textAlign: 'right',
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  appTitle: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  appTitleText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'right',
  },
  appSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'right',
  },
  navigation: {
    flex: 1,
    paddingTop: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
    textAlign: 'right',
  },
  navItem: {
    position: 'relative',
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#F0FDF4',
  },
  navItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  navItemText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'right',
  },
  navItemTextActive: {
    color: '#111827',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  userDetails: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    textAlign: 'right',
  },
  userRole: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'right',
  },
});