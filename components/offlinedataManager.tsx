import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Cloud, CloudOff, FolderSync as Sync, Check } from 'lucide-react-native';

interface OfflineData {
  id: string;
  type: 'assessment' | 'video' | 'analysis';
  timestamp: number;
  data: any;
  synced: boolean;
}

export const OfflineDataManager: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState<OfflineData[]>([]);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    // Simulate network status monitoring
    const checkNetworkStatus = () => {
      // In a real implementation, use NetInfo from @react-native-async-storage/async-storage
      setIsOnline(Math.random() > 0.3); // 70% chance of being online
    };

    const interval = setInterval(checkNetworkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const syncPendingData = async () => {
    if (!isOnline || syncInProgress) return;

    setSyncInProgress(true);
    
    // Simulate sync process
    for (const item of pendingSync) {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mark as synced
        item.synced = true;
      } catch (error) {
        console.error('Sync failed for item:', item.id);
      }
    }

    // Remove synced items
    setPendingSync(prev => prev.filter(item => !item.synced));
    setSyncInProgress(false);
  };

  const addOfflineData = (data: Omit<OfflineData, 'synced'>) => {
    const offlineItem: OfflineData = {
      ...data,
      synced: false,
    };
    setPendingSync(prev => [...prev, offlineItem]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={styles.statusIndicator}>
          {isOnline ? (
            <Cloud size={16} color="#16A34A" />
          ) : (
            <CloudOff size={16} color="#EF4444" />
          )}
          <Text style={[
            styles.statusText,
            { color: isOnline ? '#16A34A' : '#EF4444' }
          ]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>

        {pendingSync.length > 0 && (
          <View style={styles.pendingContainer}>
            <Text style={styles.pendingText}>
              {pendingSync.length} items pending sync
            </Text>
            {isOnline && (
              <TouchableOpacity 
                style={styles.syncButton}
                onPress={syncPendingData}
                disabled={syncInProgress}
              >
                {syncInProgress ? (
                  <Sync size={16} color="#1E40AF" />
                ) : (
                  <Check size={16} color="#1E40AF" />
                )}
                <Text style={styles.syncButtonText}>
                  {syncInProgress ? 'Syncing...' : 'Sync Now'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {!isOnline && (
        <View style={styles.offlineMessage}>
          <Text style={styles.offlineText}>
            You're offline. Data will be saved locally and synced when connection is restored.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pendingText: {
    fontSize: 12,
    color: '#64748B',
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  syncButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E40AF',
  },
  offlineMessage: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  offlineText: {
    fontSize: 12,
    color: '#92400E',
    textAlign: 'center',
  },
});