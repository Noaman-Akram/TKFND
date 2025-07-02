import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Eye, EyeOff, Save } from 'lucide-react-native';

interface ApiKeyConfigProps {
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

export function ApiKeyConfig({ onApiKeySet, currentApiKey = '' }: ApiKeyConfigProps) {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    if (!apiKey.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال مفتاح API صحيح');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      Alert.alert('خطأ', 'مفتاح OpenAI API يجب أن يبدأ بـ "sk-"');
      return;
    }

    onApiKeySet(apiKey.trim());
    Alert.alert('نجح', 'تم حفظ مفتاح API بنجاح');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إعداد مفتاح OpenAI API</Text>
      <Text style={styles.description}>
        أدخل مفتاح OpenAI API الخاص بك لتفعيل الذكاء الاصطناعي
      </Text>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowApiKey(!showApiKey)}
        >
          {showApiKey ? (
            <EyeOff size={20} color="#6B7280" />
          ) : (
            <Eye size={20} color="#6B7280" />
          )}
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="sk-..."
          placeholderTextColor="#9CA3AF"
          value={apiKey}
          onChangeText={setApiKey}
          secureTextEntry={!showApiKey}
          autoCapitalize="none"
          autoCorrect={false}
          textAlign="left"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Save size={20} color="#FFFFFF" />
        <Text style={styles.saveButtonText}>حفظ المفتاح</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>كيفية الحصول على مفتاح API:</Text>
        <Text style={styles.infoText}>
          1. اذهب إلى platform.openai.com{'\n'}
          2. سجل الدخول أو أنشئ حساب جديد{'\n'}
          3. اذهب إلى API Keys{'\n'}
          4. انقر على "Create new secret key"{'\n'}
          5. انسخ المفتاح والصقه هنا
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'right',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    marginLeft: 12,
  },
  eyeButton: {
    padding: 4,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  infoBox: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#0369A1',
    marginBottom: 8,
    textAlign: 'right',
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#0369A1',
    lineHeight: 18,
    textAlign: 'right',
  },
});