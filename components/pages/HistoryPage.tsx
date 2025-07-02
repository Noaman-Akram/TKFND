import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Clock, ExternalLink } from 'lucide-react-native';

export function HistoryPage() {
  const scanHistory = [
    {
      id: 1,
      title: 'Breaking: New COVID Variant Discovered',
      source: 'health-news.com',
      result: 'suspicious',
      confidence: 78,
      timestamp: '2 hours ago',
      flags: ['Unverified claims', 'Sensational language']
    },
    {
      id: 2,
      title: 'Economic Recovery Shows Positive Signs',
      source: 'reuters.com',
      result: 'reliable',
      confidence: 92,
      timestamp: '5 hours ago',
      flags: []
    },
    {
      id: 3,
      title: 'Celebrity Scandal Rocks Entertainment Industry',
      source: 'gossip-central.net',
      result: 'suspicious',
      confidence: 65,
      timestamp: '1 day ago',
      flags: ['Unverified sources', 'Clickbait title']
    },
    {
      id: 4,
      title: 'Climate Change Report Released by UN',
      source: 'un.org',
      result: 'reliable',
      confidence: 98,
      timestamp: '2 days ago',
      flags: []
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Analysis History</Text>
          <Text style={styles.subtitle}>
            Review your previous fake news detection results
          </Text>
        </View>

        <View style={styles.filterBar}>
          <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
            <Text style={[styles.filterText, styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Reliable</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Suspicious</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyList}>
          {scanHistory.map((item) => (
            <TouchableOpacity key={item.id} style={styles.historyItem}>
              <View style={styles.itemHeader}>
                <View style={styles.resultIndicator}>
                  {item.result === 'reliable' ? (
                    <CheckCircle size={20} color="#10B981" />
                  ) : (
                    <AlertTriangle size={20} color="#EF4444" />
                  )}
                  <Text style={[
                    styles.resultText,
                    { color: item.result === 'reliable' ? '#10B981' : '#EF4444' }
                  ]}>
                    {item.result === 'reliable' ? 'Reliable' : 'Suspicious'}
                  </Text>
                </View>
                <View style={styles.timestampContainer}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
              </View>

              <Text style={styles.itemTitle}>{item.title}</Text>
              
              <View style={styles.sourceContainer}>
                <ExternalLink size={14} color="#6B7280" />
                <Text style={styles.sourceText}>{item.source}</Text>
              </View>

              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Confidence: {item.confidence}%</Text>
                <View style={styles.confidenceBar}>
                  <View 
                    style={[
                      styles.confidenceFill,
                      { 
                        width: `${item.confidence}%`,
                        backgroundColor: item.result === 'reliable' ? '#10B981' : '#EF4444'
                      }
                    ]}
                  />
                </View>
              </View>

              {item.flags.length > 0 && (
                <View style={styles.flagsContainer}>
                  <Text style={styles.flagsLabel}>Flags:</Text>
                  <View style={styles.flagsList}>
                    {item.flags.map((flag, index) => (
                      <View key={index} style={styles.flagChip}>
                        <Text style={styles.flagText}>{flag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
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
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  historyList: {
    gap: 16,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 6,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 22,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  confidenceContainer: {
    marginBottom: 12,
  },
  confidenceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 6,
  },
  confidenceBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  flagsContainer: {
    marginTop: 8,
  },
  flagsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    marginBottom: 6,
  },
  flagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  flagChip: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  flagText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
  },
});