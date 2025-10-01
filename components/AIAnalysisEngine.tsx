import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Zap, Target } from 'lucide-react-native';

interface AnalysisResult {
  testType: string;
  score: number;
  confidence: number;
  anomaliesDetected: boolean;
  insights: string[];
  recommendations: string[];
}

interface Props {
  analysisResult: AnalysisResult;
}

export const AIAnalysisEngine: React.FC<Props> = ({ analysisResult }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return '#16A34A';
    if (confidence >= 85) return '#EA580C';
    return '#EF4444';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          {!analysisResult.anomaliesDetected ? (
            <CheckCircle size={24} color="#16A34A" />
          ) : (
            <AlertTriangle size={24} color="#EA580C" />
          )}
          <Text style={styles.statusText}>
            AI Analysis {analysisResult.anomaliesDetected ? 'Flagged' : 'Verified'}
          </Text>
        </View>
        
        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceLabel}>Confidence</Text>
          <Text 
            style={[
              styles.confidenceValue,
              { color: getConfidenceColor(analysisResult.confidence) }
            ]}
          >
            {analysisResult.confidence}%
          </Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Performance Score</Text>
        <Text style={styles.scoreValue}>{analysisResult.score}</Text>
      </View>

      {analysisResult.insights.length > 0 && (
        <View style={styles.insightsContainer}>
          <View style={styles.sectionHeader}>
            <Zap size={16} color="#1E40AF" />
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          {analysisResult.insights.map((insight, index) => (
            <Text key={index} style={styles.insightText}>• {insight}</Text>
          ))}
        </View>
      )}

      {analysisResult.recommendations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <View style={styles.sectionHeader}>
            <Target size={16} color="#16A34A" />
            <Text style={styles.sectionTitle}>Recommendations</Text>
          </View>
          {analysisResult.recommendations.map((recommendation, index) => (
            <Text key={index} style={styles.recommendationText}>• {recommendation}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  confidenceContainer: {
    alignItems: 'flex-end',
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1E40AF',
  },
  insightsContainer: {
    marginBottom: 16,
  },
  recommendationsContainer: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  insightText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#16A34A',
    lineHeight: 20,
    marginBottom: 8,
  },
});