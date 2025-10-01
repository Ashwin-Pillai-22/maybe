import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Medal, Crown, Star, TrendingUp, Award, Target, Zap } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

const leaderboardData = [
  {
    id: 1,
    name: 'Alex Johnson',
    score: 94,
    rank: 1,
    avatar: 'AJ',
    category: 'Overall Performance',
    improvement: '+12%',
    tests: 15,
    streak: 8,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    score: 91,
    rank: 2,
    avatar: 'SC',
    category: 'Speed Specialist',
    improvement: '+8%',
    tests: 12,
    streak: 5,
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    score: 89,
    rank: 3,
    avatar: 'MR',
    category: 'Strength Master',
    improvement: '+15%',
    tests: 18,
    streak: 12,
  },
  {
    id: 4,
    name: 'Emma Wilson',
    score: 87,
    rank: 4,
    avatar: 'EW',
    category: 'Endurance Expert',
    improvement: '+6%',
    tests: 10,
    streak: 3,
  },
  {
    id: 5,
    name: 'David Kim',
    score: 85,
    rank: 5,
    avatar: 'DK',
    category: 'All-Rounder',
    improvement: '+9%',
    tests: 14,
    streak: 6,
  },
];

const categories = [
  { id: 'overall', name: 'Overall', icon: Trophy },
  { id: 'speed', name: 'Speed', icon: Zap },
  { id: 'strength', name: 'Strength', icon: Target },
  { id: 'endurance', name: 'Endurance', icon: Award },
];

export default function LeaderboardScreen() {
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={24} color="#FFD700" />;
      case 2:
        return <Medal size={24} color="#C0C0C0" />;
      case 3:
        return <Medal size={24} color="#CD7F32" />;
      default:
        return <Star size={24} color="#666666" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#666666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>LEADERBOARD</Text>
          <Text style={styles.heroSubtitle}>
            Compete with athletes worldwide and climb the ranks
          </Text>
        </View>

        {/* Category Selector */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>CATEGORIES</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.selectedCategoryCard
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <View style={[
                    styles.categoryIcon,
                    selectedCategory === category.id && styles.selectedCategoryIcon
                  ]}>
                    <IconComponent 
                      size={20} 
                      color={selectedCategory === category.id ? '#FFFFFF' : '#666666'} 
                    />
                  </View>
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSection}>
          <Text style={styles.sectionTitle}>TIME PERIOD</Text>
          <View style={styles.periodSelector}>
            {['week', 'month', 'year'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.selectedPeriodButton
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.selectedPeriodButtonText
                ]}>
                  {period.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top 3 Podium */}
        <View style={styles.podiumSection}>
          <Text style={styles.sectionTitle}>TOP PERFORMERS</Text>
          <View style={styles.podiumContainer}>
            {/* 2nd Place */}
            <View style={styles.podiumItem}>
              <View style={[styles.podiumAvatar, { backgroundColor: '#C0C0C0' }]}>
                <Text style={styles.podiumAvatarText}>SC</Text>
              </View>
              <Text style={styles.podiumName}>Sarah Chen</Text>
              <Text style={styles.podiumScore}>91</Text>
              <View style={styles.podiumRank}>
                <Medal size={16} color="#C0C0C0" />
                <Text style={styles.podiumRankText}>2nd</Text>
              </View>
            </View>

            {/* 1st Place */}
            <View style={styles.podiumItem}>
              <View style={[styles.podiumAvatar, { backgroundColor: '#FFD700' }]}>
                <Text style={styles.podiumAvatarText}>AJ</Text>
              </View>
              <Text style={styles.podiumName}>Alex Johnson</Text>
              <Text style={styles.podiumScore}>94</Text>
              <View style={styles.podiumRank}>
                <Crown size={16} color="#FFD700" />
                <Text style={styles.podiumRankText}>1st</Text>
              </View>
            </View>

            {/* 3rd Place */}
            <View style={styles.podiumItem}>
              <View style={[styles.podiumAvatar, { backgroundColor: '#CD7F32' }]}>
                <Text style={styles.podiumAvatarText}>MR</Text>
              </View>
              <Text style={styles.podiumName}>Mike Rodriguez</Text>
              <Text style={styles.podiumScore}>89</Text>
              <View style={styles.podiumRank}>
                <Medal size={16} color="#CD7F32" />
                <Text style={styles.podiumRankText}>3rd</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Full Leaderboard */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.sectionTitle}>FULL RANKINGS</Text>
          {leaderboardData.map((athlete, index) => (
            <View key={athlete.id} style={styles.leaderboardItem}>
              <View style={styles.leaderboardLeft}>
                <View style={styles.rankContainer}>
                  {getRankIcon(athlete.rank)}
                  <Text style={[styles.rankNumber, { color: getRankColor(athlete.rank) }]}>
                    #{athlete.rank}
                  </Text>
                </View>
                <View style={styles.athleteInfo}>
                  <View style={styles.athleteAvatar}>
                    <Text style={styles.athleteAvatarText}>{athlete.avatar}</Text>
                  </View>
                  <View style={styles.athleteDetails}>
                    <Text style={styles.athleteName}>{athlete.name}</Text>
                    <Text style={styles.athleteCategory}>{athlete.category}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.leaderboardRight}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreValue}>{athlete.score}</Text>
                  <Text style={styles.scoreLabel}>SCORE</Text>
                </View>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <TrendingUp size={12} color="#16A34A" />
                    <Text style={styles.statText}>{athlete.improvement}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Target size={12} color="#666666" />
                    <Text style={styles.statText}>{athlete.tests} tests</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Your Performance */}
        <View style={styles.yourPerformanceSection}>
          <Text style={styles.sectionTitle}>YOUR PERFORMANCE</Text>
          <View style={styles.yourPerformanceCard}>
            <View style={styles.yourPerformanceHeader}>
              <View style={styles.yourRankContainer}>
                <Text style={styles.yourRankNumber}>#127</Text>
                <Text style={styles.yourRankLabel}>YOUR RANK</Text>
              </View>
              <View style={styles.yourScoreContainer}>
                <Text style={styles.yourScoreValue}>73</Text>
                <Text style={styles.yourScoreLabel}>SCORE</Text>
              </View>
            </View>
            <View style={styles.yourProgressContainer}>
              <View style={styles.yourProgressBar}>
                <View style={[styles.yourProgressFill, { width: '73%' }]} />
              </View>
              <Text style={styles.yourProgressText}>73% to next rank</Text>
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>CLIMB THE RANKS</Text>
          <Text style={styles.ctaSubtitle}>
            Take more assessments to improve your ranking
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>START NEW TEST</Text>
            <Zap size={20} color="#FFFFFF" />
          </TouchableOpacity>
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
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 52,
    marginBottom: 16,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: '85%',
  },
  categorySection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  categoryContainer: {
    paddingLeft: 0,
  },
  categoryContent: {
    paddingRight: 24,
  },
  categoryCard: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedCategoryCard: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCategoryIcon: {
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  periodSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: '#000000',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
    letterSpacing: 0.5,
  },
  selectedPeriodButtonText: {
    color: '#FFFFFF',
  },
  podiumSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F8F9FA',
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  podiumAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumScore: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
  },
  podiumRank: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  podiumRankText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  leaderboardSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 8,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  athleteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  athleteAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  athleteAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },
  athleteDetails: {
    flex: 1,
  },
  athleteName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  athleteCategory: {
    fontSize: 12,
    color: '#666666',
  },
  leaderboardRight: {
    alignItems: 'flex-end',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  yourPerformanceSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5F5F5',
  },
  yourPerformanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  yourPerformanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  yourRankContainer: {
    alignItems: 'center',
  },
  yourRankNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
  },
  yourRankLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },
  yourScoreContainer: {
    alignItems: 'center',
  },
  yourScoreValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E40AF',
  },
  yourScoreLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },
  yourProgressContainer: {
    alignItems: 'center',
  },
  yourProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  yourProgressFill: {
    height: '100%',
    backgroundColor: '#1E40AF',
    borderRadius: 4,
  },
  yourProgressText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: '80%',
    lineHeight: 26,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
});