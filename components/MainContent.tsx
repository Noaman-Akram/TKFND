import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OverviewPage } from '@/components/pages/OverviewPage';
import { ScannerPage } from '@/components/pages/ScannerPage';
import { ChatPage } from '@/components/pages/ChatPage';
import { HistoryPage } from '@/components/pages/HistoryPage';
import { AnalyticsPage } from '@/components/pages/AnalyticsPage';
import { SourcesPage } from '@/components/pages/SourcesPage';
import { SettingsPage } from '@/components/pages/SettingsPage';
import { DataSourcesPage } from '@/components/pages/DataSourcesPage';
import { AIModelsPage } from '@/components/pages/AIModelsPage';
import { SearchPage } from '@/components/pages/SearchPage';
import { ReportsPage } from '@/components/pages/ReportsPage';
import { CollaborationPage } from '@/components/pages/CollaborationPage';
import { AutomationPage } from '@/components/pages/AutomationPage';
import { SecurityPage } from '@/components/pages/SecurityPage';
import { IntegrationsPage } from '@/components/pages/IntegrationsPage';

interface MainContentProps {
  activeSection: string;
}

export function MainContent({ activeSection }: MainContentProps) {
  const renderPage = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewPage />;
      case 'scanner':
        return <ScannerPage />;
      case 'chat':
        return <ChatPage />;
      case 'history':
        return <HistoryPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'sources':
        return <SourcesPage />;
      case 'data-sources':
        return <DataSourcesPage />;
      case 'ai-models':
        return <AIModelsPage />;
      case 'search':
        return <SearchPage />;
      case 'reports':
        return <ReportsPage />;
      case 'collaboration':
        return <CollaborationPage />;
      case 'automation':
        return <AutomationPage />;
      case 'security':
        return <SecurityPage />;
      case 'integrations':
        return <IntegrationsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <View style={styles.container}>
      {renderPage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});