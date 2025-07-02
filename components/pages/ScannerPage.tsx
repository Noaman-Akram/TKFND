import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ScanLine, Upload, Link, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';

export function ScannerPage() {
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = () => {
    if (!inputText.trim()) return;
    
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanResult({
        credibility: Math.random() > 0.5 ? 'reliable' : 'suspicious',
        confidence: Math.floor(Math.random() * 30) + 70,
        sources: ['رويترز', 'وكالة الأنباء المرتبطة', 'بي بي سي'],
        flags: Math.random() > 0.7 ? ['ادعاءات غير موثقة', 'لغة متحيزة'] : [],
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>تحقيق</Text>
          <Text style={styles.subtitle}>
            تحليل المقالات أو الروابط أو النصوص لكشف المعلومات المضللة
          </Text>
        </View>

        <View style={styles.scannerCard}>
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>أدخل نص المقال أو الرابط</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={8}
              placeholder="الصق نص المقال أو الرابط هنا..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              textAlign="right"
            />
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.urlButton}>
              <Text style={styles.urlText}>فحص الرابط</Text>
              <Link size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadText}>رفع ملف</Text>
              <Upload size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
            onPress={handleScan}
            disabled={isScanning || !inputText.trim()}
          >
            <Text style={[styles.scanButtonText, isScanning && styles.scanButtonTextDisabled]}>
              {isScanning ? 'جاري التحليل...' : 'تحليل المحتوى'}
            </Text>
            <ScanLine size={20} color={isScanning ? "#9CA3AF" : "#FFFFFF"} />
          </TouchableOpacity>
        </View>

        {scanResult && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={[
                styles.resultTitle,
                { color: scanResult.credibility === 'reliable' ? '#10B981' : '#EF4444' }
              ]}>
                {scanResult.credibility === 'reliable' ? 'موثوق على الأرجح' : 'مشكوك فيه محتملاً'}
              </Text>
              {scanResult.credibility === 'reliable' ? (
                <CheckCircle size={24} color="#10B981" />
              ) : (
                <AlertTriangle size={24} color="#EF4444" />
              )}
            </View>

            <View style={styles.confidenceBar}>
              <Text style={styles.confidenceLabel}>الثقة: {scanResult.confidence}%</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${scanResult.confidence}%`,
                      backgroundColor: scanResult.credibility === 'reliable' ? '#10B981' : '#EF4444'
                    }
                  ]} 
                />
              </View>
            </View>

            <View style={styles.resultDetails}>
              <Text style={styles.detailTitle}>المصادر المتحقق منها:</Text>
              {scanResult.sources.map((source: string, index: number) => (
                <Text key={index} style={styles.sourceItem}>• {source}</Text>
              ))}

              {scanResult.flags.length > 0 && (
                <>
                  <Text style={styles.flagTitle}>علامات التحذير:</Text>
                  {scanResult.flags.map((flag: string, index: number) => (
                    <Text key={index} style={styles.flagItem}>⚠ {flag}</Text>
                  ))}
                </>
              )}
            </View>
          </View>
        )}
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
  scannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 24,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'right',
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    textAlignVertical: 'top',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  uploadText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginRight: 8,
  },
  urlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  urlText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginRight: 8,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  scanButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  scanButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  scanButtonTextDisabled: {
    color: '#9CA3AF',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  resultTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    textAlign: 'right',
  },
  confidenceBar: {
    marginBottom: 20,
  },
  confidenceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'right',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  resultDetails: {
    marginTop: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'right',
  },
  sourceItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'right',
  },
  flagTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'right',
  },
  flagItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    marginBottom: 4,
    textAlign: 'right',
  },
});