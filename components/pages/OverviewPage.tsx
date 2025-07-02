import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TrendingUp, Shield, Activity, Users, ScanLine, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export function OverviewPage() {
  const metrics = [
    { label: 'المقالات المحللة', value: '1,247', icon: ScanLine, change: '+12%' },
    { label: 'الأخبار المزيفة المكتشفة', value: '89', icon: AlertTriangle, change: '+3' },
    { label: 'معدل الدقة', value: '94.8%', icon: Shield, change: '+0.2%' },
    { label: 'صحة النظام', value: '99.9%', icon: Activity, change: '+0.1%' },
    { label: 'المستخدمون النشطون', value: '342', icon: Users, change: '+8%' },
    { label: 'نقاط الثقة', value: '8.7/10', icon: TrendingUp, change: '+0.3' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>لوحة تحكم الذكاء الاصطناعي</Text>
          <Text style={styles.subtitle}>
            رؤى فورية حول كشف الأخبار المزيفة وتحليلات المنصة
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const isPositive = metric.change.startsWith('+');
            
            return (
              <TouchableOpacity key={index} style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Text style={[
                    styles.metricChange,
                    { color: isPositive ? '#10B981' : '#EF4444' }
                  ]}>
                    {metric.change}
                  </Text>
                  <IconComponent size={24} color="#10B981" />
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>النشاط الأخير</Text>
          <View style={styles.activityList}>
            {[
              'تم اكتشاف مقال أخبار مزيفة: "اكتشاف علاج معجزة"',
              'تمت إضافة مصدر موثوق جديد: رويترز الصحة',
              'تم إنشاء تقرير الدقة الأسبوعي',
              'قام المستخدم بوضع علامة على مقال مشكوك فيه للمراجعة',
              'تم تحديث نموذج الذكاء الاصطناعي بأحدث بيانات التدريب',
            ].map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <Text style={styles.activityText}>{activity}</Text>
                <View style={styles.activityDot} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الإجراءات السريعة</Text>
          <View style={styles.quickActions}>
            {[
              'تحليل مقال',
              'إضافة مصدر موثوق',
              'إنشاء تقرير',
              'مراجعة المحتوى المبلغ عنه',
            ].map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>{action}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 32,
  },
  metricCard: {
    width: '33.33%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  metricChange: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 12,
    marginRight: 16,
    textAlign: 'right',
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginRight: 16,
    marginTop: 4,
    textAlign: 'right',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'right',
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginLeft: 12,
  },
  activityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    flex: 1,
    textAlign: 'right',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});