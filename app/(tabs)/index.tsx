import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Alert,
  ImageBackground
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Play, Square, RotateCcw, Activity, Timer, Target, ArrowRight, Zap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const fitnessTests = [
  {
    id: 1,
    name: 'Vertical Jump',
    description: 'Explosive power test',
    subtitle: 'Measure your vertical leap',
    duration: 30,
    icon: <Activity size={28} color="#FFFFFF" />,
    gradient: ['#FF6B35', '#F7931E'],
  },
  {
    id: 2,
    name: 'Sit-ups',
    description: 'Core strength endurance',
    subtitle: 'Maximum reps in 60 seconds',
    duration: 60,
    icon: <Timer size={28} color="#FFFFFF" />,
    gradient: ['#667eea', '#764ba2'],
  },
  {
    id: 3,
    name: '50m Sprint',
    description: 'Speed & acceleration',
    subtitle: 'Pure speed measurement',
    duration: 15,
    icon: <Target size={28} color="#FFFFFF" />,
    gradient: ['#f093fb', '#f5576c'],
  },
];

export default function RecordScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTest, setSelectedTest] = useState(fitnessTests[0]);
  const [recordingTime, setRecordingTime] = useState(0);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>UNLOCK YOUR{'\n'}POTENTIAL</Text>
          <Text style={styles.heroSubtitle}>
            Camera access required to record your performance and analyze your athletic potential
          </Text>
          <TouchableOpacity style={styles.nikeButton} onPress={requestPermission}>
            <Text style={styles.nikeButtonText}>GRANT ACCESS</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      
      const interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= selectedTest.duration) {
            clearInterval(interval);
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      Alert.alert('Recording Started', `Recording ${selectedTest.name} test`);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    Alert.alert(
      'Analysis Complete',
      'Your performance is being processed...',
      [
        {
          text: 'View Results',
          onPress: () => {}
        }
      ]
    );
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>JUST{'\n'}DO IT</Text>
          <Text style={styles.heroSubtitle}>
            Record your performance. Unlock your potential. Join the elite.
          </Text>
        </View>

        {/* Test Selection Cards */}
        <View style={styles.testsSection}>
          <Text style={styles.sectionTitle}>CHOOSE YOUR TEST</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.testsContainer}
            contentContainerStyle={styles.testsContent}
          >
            {fitnessTests.map((test) => (
              <TouchableOpacity
                key={test.id}
                style={[
                  styles.testCard,
                  selectedTest.id === test.id && styles.selectedTestCard
                ]}
                onPress={() => setSelectedTest(test)}
              >
                <View style={[styles.testCardGradient, { 
                  backgroundColor: selectedTest.id === test.id ? '#000000' : '#1A1A1A' 
                }]}>
                  <View style={styles.testIcon}>{test.icon}</View>
                  <Text style={styles.testName}>{test.name}</Text>
                  <Text style={styles.testDescription}>{test.description}</Text>
                  <Text style={styles.testSubtitle}>{test.subtitle}</Text>
                  <View style={styles.testDurationBadge}>
                    <Text style={styles.testDuration}>{test.duration}s</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Test Info */}
        <View style={styles.selectedTestSection}>
          <View style={styles.selectedTestHeader}>
            <Text style={styles.selectedTestName}>{selectedTest.name.toUpperCase()}</Text>
            <View style={styles.selectedTestBadge}>
              <Zap size={16} color="#000000" />
              <Text style={styles.selectedTestBadgeText}>AI POWERED</Text>
            </View>
          </View>
          <Text style={styles.selectedTestDescription}>{selectedTest.description}</Text>
        </View>

        {/* Camera Section */}
        <View style={styles.cameraSection}>
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
            >
              {isRecording && (
                <View style={styles.recordingOverlay}>
                  <View style={styles.recordingHeader}>
                    <View style={styles.recordingIndicator}>
                      <View style={styles.recordingDot} />
                      <Text style={styles.recordingText}>REC {recordingTime}s</Text>
                    </View>
                    <Text style={styles.recordingTestName}>{selectedTest.name.toUpperCase()}</Text>
                  </View>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${(recordingTime / selectedTest.duration) * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {selectedTest.duration - recordingTime}s remaining
                    </Text>
                  </View>
                </View>
              )}
              
              <View style={styles.cameraControls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={toggleCameraFacing}
                >
                  <RotateCcw size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    isRecording && styles.recordButtonActive
                  ]}
                  onPress={isRecording ? stopRecording : startRecording}
                >
                  <View style={styles.recordButtonInner}>
                    {isRecording ? (
                      <Square size={24} color="#FFFFFF" />
                    ) : (
                      <Play size={28} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.controlButton} />
              </View>
            </CameraView>
          </View>
        </View>

        {/* AI Status */}
        <View style={styles.aiStatusSection}>
          <View style={styles.aiStatusCard}>
            <View style={styles.aiStatusIcon}>
              <Zap size={24} color="#000000" />
            </View>
            <View style={styles.aiStatusContent}>
              <Text style={styles.aiStatusTitle}>AI ANALYSIS READY</Text>
              <Text style={styles.aiStatusSubtitle}>
                Advanced motion detection • Cheat prevention active
              </Text>
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>READY TO PERFORM?</Text>
          <Text style={styles.ctaSubtitle}>
            Your journey to athletic excellence starts with one recording.
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>START ASSESSMENT</Text>
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
    minHeight: 200,
    justifyContent: 'center',
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
    marginBottom: 32,
    maxWidth: '85%',
  },
  nikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    alignSelf: 'flex-start',
    gap: 8,
  },
  nikeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  testsSection: {
    paddingVertical: 40,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    paddingHorizontal: 24,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  testsContainer: {
    paddingLeft: 24,
  },
  testsContent: {
    paddingRight: 24,
  },
  testCard: {
    width: 280,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedTestCard: {
    transform: [{ scale: 1.02 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  testCardGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  testIcon: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  testName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  testDescription: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 2,
  },
  testSubtitle: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 16,
  },
  testDurationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  testDuration: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  selectedTestSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
  selectedTestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectedTestName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.5,
  },
  selectedTestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  selectedTestBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  selectedTestDescription: {
    fontSize: 18,
    color: '#666666',
    lineHeight: 26,
  },
  cameraSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  cameraContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000000',
    aspectRatio: 9/16,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  recordingOverlay: {
    padding: 24,
  },
  recordingHeader: {
    alignItems: 'flex-start',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0000',
    marginRight: 8,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  recordingTestName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordButtonActive: {
    backgroundColor: '#FF0000',
  },
  recordButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiStatusSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5F5F5',
  },
  aiStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  aiStatusIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  aiStatusContent: {
    flex: 1,
  },
  aiStatusTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  aiStatusSubtitle: {
    fontSize: 14,
    color: '#666666',
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