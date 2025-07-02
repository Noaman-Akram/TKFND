import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import {
  Search,
  Bell,
  Menu,
  Plus,
  Sparkles,
} from 'lucide-react-native';

interface TopBarProps {
  activeSection: string;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onLogoPress?: () => void;
}

const sectionTitles: Record<string, string> = {
  'overview': 'لوحة التحكم',
  'scanner': 'تحقيق',
  'chat': 'الذكاء الاصطناعي',
  'history': 'سجل التحليل',
  'analytics': 'التحليلات',
  'sources': 'المصادر الموثوقة',
  'data-sources': 'مصادر البيانات',
  'ai-models': 'نماذج الذكاء الاصطناعي',
  'search': 'البحث',
  'reports': 'التقارير',
  'collaboration': 'التعاون',
  'automation': 'الأتمتة',
  'security': 'الأمان',
  'integrations': 'التكاملات',
  'settings': 'الإعدادات',
};

const { width } = Dimensions.get('window');

export function TopBar({ activeSection, onToggleSidebar, sidebarOpen, onLogoPress }: TopBarProps) {
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;
  const isMobile = width < 768;

  // Handler for logo click to go to homepage (overview)
  const handleLogoPress = () => {
    if (typeof onLogoPress === 'function') {
      onLogoPress();
    }
  };

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      {/* Right Section - User Actions */}
      <View style={[styles.rightSection, isMobile && styles.rightSectionMobile]}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>م</Text>
        </View>
        
        {!isMobile && (
          <>
            <TouchableOpacity style={styles.actionButton}>
              <Bell size={18} color="#6B7280" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <Plus size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>جديد</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Left Section - Brand & Navigation */}
      <View style={[styles.leftSection, isMobile && styles.leftSectionMobile]}>
        {!isMobile && (
          <Text style={[styles.title, isTablet && styles.titleTablet]}>
            {sectionTitles[activeSection] || 'منصة الذكاء الاصطناعي'}
          </Text>
        )}
        
        {!isMobile && <View style={styles.divider} />}
        
        {/* Enhanced Logo - now clickable and uses Image */}
        <TouchableOpacity onPress={handleLogoPress} style={[styles.logoContainer, isMobile && styles.logoContainerMobile]}>
          <View style={[styles.logoIcon, isMobile && styles.logoIconMobile]}>
            <Image
              source={require('../assets/images/Black.png')}
              style={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40, resizeMode: 'contain' }}
            />
          </View>
          <View style={styles.brandTextContainer}>

            {!isMobile && (
              <Text style={styles.brandSubtext}>AI Platform</Text>
            )}
          </View>
        </TouchableOpacity>
        <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>
        <TouchableOpacity
          style={[styles.menuButton, isMobile && styles.menuButtonMobile]}
          onPress={onToggleSidebar}
        >
          <Menu size={isMobile ? 18 : 20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Mobile Actions Row */}
      {isMobile && (
        <View style={styles.mobileActionsRow}>
          <TouchableOpacity style={styles.mobileActionButton}>
            <Bell size={16} color="#6B7280" />
            <View style={styles.mobileNotificationBadge}>
              <Text style={styles.mobileBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.mobileActionButton, styles.mobilePrimaryButton]}>
            <Plus size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 72,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  containerMobile: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 64,
    flexWrap: 'wrap',
  },
  
  // Left Section - Brand & Navigation
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  leftSectionMobile: {
    flex: 0,
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  logoContainerMobile: {
    marginLeft: 0,
    marginRight: 12,
  },
  
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  logoIconMobile: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginLeft: 8,
  },
  
  brandTextContainer: {
    alignItems: 'flex-end',
  },
  
  brandText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(16, 185, 129, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  brandTextMobile: {
    fontSize: 16,
    letterSpacing: 1,
  },
  
  brandSubtext: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 2,
    letterSpacing: 0.5,
    textAlign: 'right',
  },
  
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#E5E7EB',
    marginLeft: 16,
  },
  
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    textAlign: 'right',
    flex: 1,
    minWidth: 0,
  },
  titleTablet: {
    fontSize: 16,
  },
  
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuButtonMobile: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginLeft: 8,
  },
  
  // Right Section - User Actions
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightSectionMobile: {
    flex: 0,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  
  primaryButton: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
    paddingHorizontal: 16,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  
  primaryButtonText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginRight: 6,
  },
  
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  
  userAvatarText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  
  // Mobile Actions Row
  mobileActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  
  mobileActionButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  
  mobilePrimaryButton: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  
  mobileNotificationBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#EF4444',
    borderRadius: 6,
    minWidth: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  
  mobileBadgeText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});