import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Settings, 
  Edit, 
  Trophy, 
  Target, 
  Activity, 
  TrendingUp, 
  Award,
  Star,
  Share,
  Bell,
  HelpCircle,
  LogOut,
  Camera,
  User,
  Shield,
  Zap
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

const userStats = {
  overallScore: 73,
  rank: 127,
  testsCompleted: 12,
  streak: 5,
  achievements: 8,
  improvement: '+12%',
};

const achievements = [
  {
    id: 1,
    title: 'First Test',
    description: 'Completed your first fitness test',
    icon: Target,
    color: '#FF6B35',
    earned: true,
  },
  {
    id: 2,
    title: 'Consistency King',
    description: '7-day testing streak',
    icon: Trophy,
    color: '#FFD700',
    earned: true,
  },
  {
    id: 3,
    title: 'Speed Demon',
    description: 'Sub-7s sprint time',
    icon: Zap,
    color: '#667eea',
    earned: false,
  },
  {
    id: 4,
    title: 'Strength Master',
    description: '90+ strength score',
    icon: Shield,
    color: '#f5576c',
    earned: false,
  },
];

const menuItems = [
  {
    id: 1,
    title: 'Settings',
    icon: Settings,
    action: 'settings',
  },
  {
    id: 2,
    title: 'Notifications',
    icon: Bell,
    action: 'notifications',
  },
  {
    id: 3,
    title: 'Share Profile',
    icon: Share,
    action: 'share',
  },
  {
    id: 4,
    title: 'Help & Support',
    icon: HelpCircle,
    action: 'help',
  },
  {
    id: 5,
    title: 'Sign Out',
    icon: LogOut,
    action: 'logout',
    destructive: true,
  },
];

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'settings':
        Alert.alert('Settings', 'Settings functionality coming soon!');
        break;
      case 'notifications':
        Alert.alert('Notifications', 'Notification settings coming soon!');
        break;
      case 'share':
        Alert.alert('Share Profile', 'Share functionality coming soon!');
        break;
      case 'help':
        Alert.alert('Help & Support', 'Help center coming soon!');
        break;
      case 'logout':
        Alert.alert(
          'Sign Out',
          'Are you sure you want to sign out?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', style: 'destructive', onPress: () => {} }
          ]
        );
        break;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'achievements', name: 'Achievements' },
    { id: 'stats', name: 'Stats' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={32} color="#FFFFFF" />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Camera size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userRank}>Rank #{userStats.rank}</Text>
              <View style={styles.verificationBadge}>
                <Star size={12} color="#FFD700" />
                <Text style={styles.verificationText}>Verified Athlete</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.overallScore}</Text>
              <Text style={styles.statLabel}>Overall Score</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.testsCompleted}</Text>
              <Text style={styles.statLabel}>Tests Done</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.achievements}</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabSection}>
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  selectedTab === tab.id && styles.selectedTabButton
                ]}
                onPress={() => setSelectedTab(tab.id)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.selectedTabText
                ]}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <View style={styles.tabContent}>
            {/* Recent Activity */}
            <View style={styles.activitySection}>
              <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
              <View style={styles.activityCard}>
                <View style={styles.activityIcon}>
                  <Target size={20} color="#FFFFFF" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Vertical Jump Test</Text>
                  <Text style={styles.activityDescription}>Scored 65 points - Personal best!</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
                <View style={styles.activityScore}>
                  <Text style={styles.activityScoreText}>65</Text>
                </View>
              </View>
              <View style={styles.activityCard}>
                <View style={styles.activityIcon}>
                  <Activity size={20} color="#FFFFFF" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Sit-ups Challenge</Text>
                  <Text style={styles.activityDescription}>Completed 45 reps in 60 seconds</Text>
                  <Text style={styles.activityTime}>1 day ago</Text>
                </View>
                <View style={styles.activityScore}>
                  <Text style={styles.activityScoreText}>45</Text>
                </View>
              </View>
            </View>

            {/* Progress Chart */}
            <View style={styles.progressSection}>
              <Text style={styles.sectionTitle}>PROGRESS TREND</Text>
              <View style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Overall Performance</Text>
                  <View style={styles.progressBadge}>
                    <TrendingUp size={12} color="#16A34A" />
                    <Text style={styles.progressBadgeText}>+12%</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '73%' }]} />
                </View>
                <Text style={styles.progressText}>73% to next rank</Text>
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'achievements' && (
          <View style={styles.tabContent}>
            <View style={styles.achievementsSection}>
              <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
              <View style={styles.achievementsGrid}>
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <View key={achievement.id} style={styles.achievementCard}>
                      <View style={[
                        styles.achievementIcon,
                        { backgroundColor: achievement.earned ? achievement.color : '#F0F0F0' }
                      ]}>
                        <IconComponent 
                          size={24} 
                          color={achievement.earned ? '#FFFFFF' : '#999999'} 
                        />
                      </View>
                      <Text style={[
                        styles.achievementTitle,
                        !achievement.earned && styles.achievementTitleLocked
                      ]}>
                        {achievement.title}
                      </Text>
                      <Text style={[
                        styles.achievementDescription,
                        !achievement.earned && styles.achievementDescriptionLocked
                      ]}>
                        {achievement.description}
                      </Text>
                      {achievement.earned && (
                        <View style={styles.achievementBadge}>
                          <Award size={12} color="#FFD700" />
                          <Text style={styles.achievementBadgeText}>EARNED</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'stats' && (
          <View style={styles.tabContent}>
            <View style={styles.statsDetailSection}>
              <Text style={styles.sectionTitle}>DETAILED STATS</Text>
              
              <View style={styles.statsDetailCard}>
                <Text style={styles.statsDetailTitle}>Performance Breakdown</Text>
                <View style={styles.statsDetailItem}>
                  <Text style={styles.statsDetailLabel}>Speed</Text>
                  <View style={styles.statsDetailBar}>
                    <View style={[styles.statsDetailFill, { width: '85%', backgroundColor: '#FF6B35' }]} />
                  </View>
                  <Text style={styles.statsDetailValue}>85%</Text>
                </View>
                <View style={styles.statsDetailItem}>
                  <Text style={styles.statsDetailLabel}>Strength</Text>
                  <View style={styles.statsDetailBar}>
                    <View style={[styles.statsDetailFill, { width: '72%', backgroundColor: '#667eea' }]} />
                  </View>
                  <Text style={styles.statsDetailValue}>72%</Text>
                </View>
                <View style={styles.statsDetailItem}>
                  <Text style={styles.statsDetailLabel}>Endurance</Text>
                  <View style={styles.statsDetailBar}>
                    <View style={[styles.statsDetailFill, { width: '68%', backgroundColor: '#f5576c' }]} />
                  </View>
                  <Text style={styles.statsDetailValue}>68%</Text>
                </View>
              </View>

              <View style={styles.statsDetailCard}>
                <Text style={styles.statsDetailTitle}>Test History</Text>
                <View style={styles.testHistoryItem}>
                  <Text style={styles.testHistoryDate}>Today</Text>
                  <Text style={styles.testHistoryTest}>Vertical Jump</Text>
                  <Text style={styles.testHistoryScore}>65 pts</Text>
                </View>
                <View style={styles.testHistoryItem}>
                  <Text style={styles.testHistoryDate}>Yesterday</Text>
                  <Text style={styles.testHistoryTest}>Sit-ups</Text>
                  <Text style={styles.testHistoryScore}>45 reps</Text>
                </View>
                <View style={styles.testHistoryItem}>
                  <Text style={styles.testHistoryDate}>3 days ago</Text>
                  <Text style={styles.testHistoryTest}>50m Sprint</Text>
                  <Text style={styles.testHistoryScore}>7.2s</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuAction(item.action)}
            >
              <View style={styles.menuItemLeft}>
                <item.icon 
                  size={20} 
                  color={item.destructive ? '#EF4444' : '#666666'} 
                />
                <Text style={[
                  styles.menuItemText,
                  item.destructive && styles.menuItemTextDestructive
                ]}>
                  {item.title}
                </Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#000000',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRank: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verificationText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5F5F5',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
    textAlign: 'center',
  },
  tabSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTabButton: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  selectedTabText: {
    color: '#000000',
  },
  tabContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  activitySection: {
    marginBottom: 32,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999999',
  },
  activityScore: {
    alignItems: 'center',
  },
  activityScoreText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E40AF',
  },
  progressSection: {
    marginBottom: 32,
  },
  progressCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  progressBadgeText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1E40AF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  achievementsSection: {
    marginBottom: 32,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  achievementCard: {
    width: (screenWidth - 80) / 2,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#999999',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 8,
  },
  achievementDescriptionLocked: {
    color: '#CCCCCC',
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  achievementBadgeText: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '700',
  },
  statsDetailSection: {
    marginBottom: 32,
  },
  statsDetailCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  statsDetailTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  statsDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsDetailLabel: {
    fontSize: 14,
    color: '#666666',
    width: 80,
  },
  statsDetailBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  statsDetailFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsDetailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    width: 40,
    textAlign: 'right',
  },
  testHistoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  testHistoryDate: {
    fontSize: 12,
    color: '#999999',
    width: 60,
  },
  testHistoryTest: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
    marginLeft: 12,
  },
  testHistoryScore: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
  },
  menuSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5F5F5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  menuItemTextDestructive: {
    color: '#EF4444',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#CCCCCC',
  },
});