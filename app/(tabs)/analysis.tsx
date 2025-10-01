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
import { TrendingUp, Award, Clock, Target, Zap, ArrowRight, ChartBar as BarChart3, Activity } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

const performanceData = {
  verticalJump: {
    score: 65,
    height: '58cm',
    benchmark: '52cm',
    percentile: 75,
    improvement: '+8%',
    trend: 'up',
  },
  sitUps: {
    score: 82,
    reps: 45,
    benchmark: 35,
    percentile: 88,
    improvement: '+12%',
    trend: 'up',
  },
  sprint: {
    score: 71,
    time: '7.2s',
    benchmark: '8.1s',
    percentile: 79,
    improvement: '+15%',
    trend: 'up',
  },
};

const insights = [
  {
    id: 1,
    category: 'STRENGTH',
    title: 'Explosive Power Peak',
    description: 'Your vertical jump shows exceptional improvement. You\'re in the top 25% nationally.',
    impact: 'HIGH',
    color: '#FF6B35',
  },
  {
    id: 2,
    category: 'ENDURANCE',
    title: 'Core Dominance',
    description: 'Sit-up performance indicates strong core stability and muscular endurance.',
    impact: 'MEDIUM',
    color: '#667eea',
  },
  {
    id: 3,
    category: 'SPEED',
    title: 'Sprint Technique',
    description: 'Optimize arm movement for additional 0.3s improvement potential.',
    impact: 'HIGH',
    color: '#f5576c',
  },
];

export default function AnalysisScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>YOUR{'\n'}PERFORMANCE</Text>
          <Text style={styles.heroSubtitle}>
            AI-powered insights to unlock your athletic potential
          </Text>
        </View>

        {/* Overall Score Card */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreCard}>
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreLabel}>OVERALL SCORE</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={16} color="#000000" />
                <Text style={styles.trendText}>RISING</Text>
              </View>
            </View>
            <Text style={styles.scoreValue}>73</Text>
            <Text style={styles.scoreSubtitle}>Above National Average</Text>
            <View style={styles.scoreProgress}>
              <View style={[styles.scoreProgressFill, { width: '73%' }]} />
            </View>
          </View>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSection}>
          <Text style={styles.sectionTitle}>PERFORMANCE BREAKDOWN</Text>
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

        {/* Performance Cards */}
        <View style={styles.performanceSection}>
          {Object.entries(performanceData).map(([key, data], index) => (
            <View key={key} style={styles.performanceCard}>
              <View style={styles.performanceHeader}>
                <View style={styles.performanceIcon}>
                  {key === 'verticalJump' ? <Target size={24} color="#FFFFFF" /> :
                   key === 'sitUps' ? <Zap size={24} color="#FFFFFF" /> :
                   <Clock size={24} color="#FFFFFF" />}
                </View>
                <View style={styles.performanceInfo}>
                  <Text style={styles.performanceTitle}>
                    {key === 'verticalJump' ? 'VERTICAL JUMP' : 
                     key === 'sitUps' ? 'SIT-UPS' : '50M SPRINT'}
                  </Text>
                  <Text style={styles.performanceValue}>
                    {key === 'verticalJump' ? (data as any).height : 
                     key === 'sitUps' ? `${(data as any).reps} reps` : (data as any).time}
                  </Text>
                </View>
                <View style={styles.performanceScore}>
                  <Text style={styles.scoreNumber}>{data.score}</Text>
                  <Text style={styles.improvementText}>{data.improvement}</Text>
                </View>
              </View>
              
              <View style={styles.performanceMetrics}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>PERCENTILE</Text>
                  <Text style={styles.metricValue}>{data.percentile}th</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>BENCHMARK</Text>
                  <Text style={styles.metricValue}>{data.benchmark}</Text>
                </View>
              </View>

              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressBarFill,
                      { width: `${data.percentile}%` }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* AI Insights Section */}
        <View style={styles.insightsSection}>
          <View style={styles.insightsHeader}>
            <Text style={styles.sectionTitle}>AI INSIGHTS</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
              <ArrowRight size={16} color="#000000" />
            </TouchableOpacity>
          </View>

          {insights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={[styles.insightCategory, { backgroundColor: insight.color }]}>
                  <Text style={styles.insightCategoryText}>{insight.category}</Text>
                </View>
                <View style={[styles.impactBadge, { 
                  backgroundColor: insight.impact === 'HIGH' ? '#FF6B35' : '#667eea' 
                }]}>
                  <Text style={styles.impactText}>{insight.impact}</Text>
                </View>
              </View>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightDescription}>{insight.description}</Text>
            </View>
          ))}
        </View>

        {/* Recommendations Section */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>RECOMMENDED ACTIONS</Text>
          
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationIcon}>
              <Activity size={24} color="#FFFFFF" />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>FOCUS ON TECHNIQUE</Text>
              <Text style={styles.recommendationDescription}>
                Work on arm positioning during sprint starts for 0.3s improvement
              </Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <ArrowRight size={20} color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationIcon}>
              <BarChart3 size={24} color="#FFFFFF" />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>STRENGTH TRAINING</Text>
              <Text style={styles.recommendationDescription}>
                Increase plyometric exercises to boost vertical jump performance
              </Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <ArrowRight size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>READY FOR MORE?</Text>
          <Text style={styles.ctaSubtitle}>
            Take another assessment to track your progress
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>RECORD NEW TEST</Text>
            <ArrowRight size={20} color="#FFFFFF" />
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
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 52,
    marginBottom: 16,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    lineHeight: 26,
    maxWidth: '85%',
  },
  scoreSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5F5F5',
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
    letterSpacing: 1,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: '900',
    color: '#000000',
    lineHeight: 64,
    marginBottom: 8,
  },
  scoreSubtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 24,
  },
  scoreProgress: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreProgressFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 4,
  },
  periodSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
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
  performanceSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  performanceCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 24,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  performanceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  performanceInfo: {
    flex: 1,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  performanceValue: {
    fontSize: 16,
    color: '#666666',
  },
  performanceScore: {
    alignItems: 'flex-end',
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000000',
    lineHeight: 32,
  },
  improvementText: {
    fontSize: 14,
    color: '#16A34A',
    fontWeight: '700',
  },
  performanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#666666',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  insightsSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5F5F5',
  },
  insightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightCategory: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  insightCategoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  insightTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  insightDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  recommendationsSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  recommendationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
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