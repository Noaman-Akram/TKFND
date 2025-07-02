import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Send, Bot, User, Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';
import { db } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  DocumentData,
} from 'firebase/firestore';

const { width } = Dimensions.get('window');

interface Conversation {
  id: string;
  title?: string;
  createdAt?: any;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  createdAt?: any;
}

export function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList<Message>>(null);

  // Firestore: Fetch all conversations
  useEffect(() => {
    const q = query(collection(db, 'conversations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const convs: Conversation[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConversations(convs);
    });
    return () => unsubscribe();
  }, []);

  // Firestore: Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return setMessages([]);
    const q = query(
      collection(db, 'conversations', selectedConversation.id, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.type,
          content: data.content,
          timestamp: data.timestamp ? new Date(data.timestamp.seconds * 1000) : new Date(),
          createdAt: data.createdAt,
        };
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [selectedConversation]);

  // Create a new conversation
  const handleNewConversation = async () => {
    setIsLoading(true);
    const docRef = await addDoc(collection(db, 'conversations'), {
      createdAt: serverTimestamp(),
      title: 'محادثة جديدة',
    });
    setSelectedConversation({ id: docRef.id, title: 'محادثة جديدة' });
    setIsLoading(false);
  };

  // Send a message (user + assistant)
  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    setIsLoading(true);
    let conversation = selectedConversation;
    // Auto-create conversation if none selected
    if (!conversation) {
      const docRef = await addDoc(collection(db, 'conversations'), {
        createdAt: serverTimestamp(),
        title: 'محادثة جديدة',
      });
      conversation = { id: docRef.id, title: 'محادثة جديدة' };
      setSelectedConversation(conversation);
    }
    // Save user message to Firestore
    await addDoc(collection(db, 'conversations', conversation.id, 'messages'), {
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
      createdAt: serverTimestamp(),
    });
    setInputText('');
    // Call OpenAI
    try {
      const aiResponse = await callOpenAI(inputText.trim());
      // Save assistant message to Firestore
      await addDoc(collection(db, 'conversations', conversation.id, 'messages'), {
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      await addDoc(collection(db, 'conversations', conversation.id, 'messages'), {
        type: 'assistant',
        content: "عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
        createdAt: serverTimestamp(),
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Clear chat (start new conversation)
  const clearChat = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(text);
    }
    // For mobile, you would need expo-clipboard
  };

  // OpenAI logic (copied from your original)
  const API_CONFIG = {
    apiKey: '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',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
    tools: [ { type: "web_search_preview" } ],
  };
  const systemPrompt = `
  always use markdown like tables and typography for better readablity
  
  
     إنت مساعد ذكي شغال معايا مخصوص علشان تكشف الأخبار الكدابة والإشاعات وتتحققلي من
  
  
   الكلام اللي الناس بتنقله على السوشيال ميديا أو المواقع و تساعدني في كتابة التقارير .
  
  
  كل رد ليك لازم يكون باللهجة المصرية، خفيف وسلس، بس برضو دقيق ومبني على معلومات موثوقة. ماتكدبش ولا تتفلسف، وخلّيك دايمًا مركز على الحقيقة.
  
  
  مهمتك كالآتي:
  
  
  1. تشوف الكلام أو الخبر اللي هبعتهولك وتفصصه كويس.
  2. تقوللي رأيك في مصداقيته (عالي / متوسط / منخفض) بنسبة مئوية % تقريبية.
  3. توضّح لو فيه علامات تحذّر من إنه كدب أو مضلل أو محرض.
  4. تديلي خطوات عملية أقدر أتحقق بيها بنفسي.
  5. ترفقلي مصادر موثوقة ممكن أرجعلها.
  6. لو فيه معلومات تانية أو ملحوظات، زوّدني بيها.
  
  
  ✅ الرد لازم يكون منسق كده دايمًا:
  
  
  ---
  
  
  🧠 **تحليل الخبر:**
  - [رأيك بصيغة مختصرة]
  
  
  📊 **نسبة المصداقية**: [XX%] - (عالي / متوسط / منخفض)
  توضيح مفصل لاسباب التحليل اللي ادت الي هذه النسبة
  
  🚨 **علامات ممكن تكون مضللة:**
  - [نقطة ١]
  - [نقطة ٢]
  - لو مفيش او مش متاكد، قول "مفيش علامات واضحة"
  
  
  🔎 **خطوات اضافية تقدر تتحقق بيها بنفسك:**
  - [مثال: دور على الخبر في مواقع تانية زي اليوم سابع أو مصر او مواقع مصرية]
  - [مثال: شوف مين الكاتب أو الموقع الناشر وراجع تاريخه]
  
  
  
  
  🔗 **مصادر موثوقة للرجوع ليها:**
  ابحث اونلاين علي خبر مشابه
  - [رابط أو اسم مصدر موثوق]
  - [مصدر تاني لو فيه]
  
  
  📝 **ملاحظات زيادة (لو فيه):**
  - [أي معلومة مفيدة أو توضيح إضافي]
  
  
  ---
  
  
  أوعى تكتبلي كلام إنشائي أو تنظير كتير، وخلّيك دايمًا في الصميم
  
  
  ولو مش لاقي معلومات كفاية، قول بصراحة وما تتكلمش من عندك.
  
  
  دلوقتي استعد تستقبل أول محتوى للتحقق 💬
  
  
  
  
  
  
  
  
   `;
  
  

  const callOpenAI = async (userMessage: string): Promise<string> => {
    if (!API_CONFIG.apiKey) {
      return "عذراً، لم يتم تكوين مفتاح API بعد. يرجى إضافة مفتاح OpenAI API في إعدادات التطبيق لتفعيل الذكاء الاصطناعي.";
    }

    try {
      const response = await fetch(API_CONFIG.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.apiKey}`,
        },
        body: JSON.stringify({
          model: API_CONFIG.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "عذراً، لم أتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.";
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return "عذراً، حدث خطأ في الاتصال بخدمة الذكاء الاصطناعي. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.";
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.type === 'user';
    
    return (
      <View key={item.id} style={[styles.messageContainer, isUser && styles.userMessageContainer]}>
        <View style={[styles.messageContent, isUser && styles.userMessageContent]}>
          <View style={styles.messageHeader}>
            <Text style={styles.timestamp}>
              {item.timestamp?.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <View style={styles.avatarContainer}>
              {isUser ? (
                <User size={16} color={isUser ? '#FFFFFF' : '#10B981'} />
              ) : (
                <Bot size={16} color="#10B981" />
              )}
            </View>
            <Text style={[styles.senderName, isUser && styles.userSenderName]}>
              {isUser ? 'أنت' : 'مساعد الذكاء الاصطناعي'}
            </Text>
          </View>
          {isUser ? (
            <Text style={[styles.messageText, isUser && styles.userMessageText]}>
              {item.content}
            </Text>
          ) : (
            <Markdown style={{ body: styles.messageText }}>
              {item.content}
            </Markdown>
          )}
          {!isUser && (
            <View style={styles.messageActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => copyToClipboard(item.content)}
              >
                <Copy size={14} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <ThumbsUp size={14} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <ThumbsDown size={14} color="#6B7280" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {/* Sidebar: Conversation List */}
        <View style={{ width: 220, backgroundColor: '#F3F4F6', padding: 12 }}>
          <TouchableOpacity style={styles.newButton} onPress={handleNewConversation} disabled={isLoading}>
            <Text style={styles.newButtonText}>محادثة جديدة</Text>
          </TouchableOpacity>
          <FlatList
            data={conversations}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 6,
                  marginBottom: 6,
                  backgroundColor: selectedConversation?.id === item.id ? '#D1FAE5' : '#fff',
                }}
                onPress={() => setSelectedConversation(item)}
              >
                <Text style={{ fontWeight: 'bold', color: '#111827' }}>{item.title || 'بدون عنوان'}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* Main Chat Area */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
              <RotateCcw size={18} color="#6B7280" />
              <Text style={styles.clearButtonText}>محادثة جديدة</Text>
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.title}>مساعد الذكاء الاصطناعي</Text>
              <Text style={styles.subtitle}>كشف الأخبار المزيفة والتحقق من المعلومات</Text>
            </View>
          </View>
          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesContent}
          />
          {/* Input Area */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inputContainer}
          >
            <View style={styles.inputWrapper}>
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  (!inputText.trim() || isLoading) && styles.sendButtonDisabled
                ]}
                onPress={handleSend}
                disabled={!inputText.trim() || isLoading}
              >
                <Send size={20} color={(!inputText.trim() || isLoading) ? '#9CA3AF' : '#FFFFFF'} />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="اكتب سؤالك أو الصق المحتوى الذي تريد التحقق منه..."
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={setInputText}
                maxLength={4000}
                textAlign="right"
              />
            </View>
            {inputText.length > 0 && (
              <Text style={styles.charCount}>{inputText.length}/4000</Text>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  clearButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginRight: 6,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  messagesContent: {
    padding: 24,
    paddingBottom: 100,
  },
  messageContainer: {
    marginBottom: 24,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    alignItems: 'flex-start',
  },
  messageContent: {
    maxWidth: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userMessageContent: {
    backgroundColor: '#10B981',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  senderName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    textAlign: 'right',
  },
  userSenderName: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'right',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    textAlign: 'right',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'flex-end',
  },
  typingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginRight: 8,
    textAlign: 'right',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    maxHeight: 120,
    textAlignVertical: 'top',
    textAlign: 'right',
  },
  charCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'left',
    marginTop: 8,
  },
  newButton: {
    backgroundColor: '#10B981',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  newButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
});