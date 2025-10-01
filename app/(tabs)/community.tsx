import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MessageCircle, 
  Heart, 
  Share, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter,
  Users,
  Trophy,
  Zap,
  Target,
  Activity,
  TrendingUp,
  Star
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

const communityPosts = [
  {
    id: 1,
    user: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      verified: true,
      rank: 1,
    },
    content: 'Just hit a new personal best in vertical jump! 65cm today 🚀 The AI analysis really helped me identify the right technique.',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    shares: 3,
    category: 'Achievement',
    tags: ['vertical-jump', 'personal-best', 'ai-analysis'],
  },
  {
    id: 2,
    user: {
      name: 'Sarah Chen',
      avatar: 'SC',
      verified: true,
      rank: 2,
    },
    content: 'Sharing my 30-day transformation results. The consistency really paid off! 💪',
    timestamp: '5 hours ago',
    likes: 42,
    comments: 15,
    shares: 8,
    category: 'Transformation',
    tags: ['transformation', '30-days', 'results'],
  },
  {
    id: 3,
    user: {
      name: 'Mike Rodriguez',
      avatar: 'MR',
      verified: true,
      rank: 3,
    },
    content: 'Pro tip: Focus on your breathing during sit-ups. It makes a huge difference in endurance!',
    timestamp: '1 day ago',
    likes: 18,
    comments: 6,
    shares: 2,
    category: 'Tip',
    tags: ['sit-ups', 'breathing', 'endurance'],
  },
];

const challenges = [
  {
    id: 1,
    title: '7-Day Sprint Challenge',
    description: 'Complete 7 sprint tests in 7 days',
    participants: 1247,
    reward: 'Exclusive badge',
    icon: Zap,
    color: '#FF6B35',
  },
  {
    id: 2,
    title: 'Strength Master',
    description: 'Achieve 90+ score in strength tests',
    participants: 892,
    reward: 'Trophy icon',
    icon: Target,
    color: '#667eea',
  },
  {
    id: 3,
    title: 'Endurance Warrior',
    description: 'Complete 30 minutes of continuous activity',
    participants: 654,
    reward: 'Special title',
    icon: Activity,
    color: '#f5576c',
  },
];

const categories = [
  { id: 'all', name: 'All', icon: MessageCircle },
  { id: 'achievements', name: 'Achievements', icon: Trophy },
  { id: 'tips', name: 'Tips', icon: Target },
  { id: 'challenges', name: 'Challenges', icon: Zap },
];

export default function CommunityScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = (postId: number) => {
    // Handle like functionality
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: number) => {
    // Handle comment functionality
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: number) => {
    // Handle share functionality
    console.log('Share post:', postId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>COMMUNITY</Text>
          <Text style={styles.heroSubtitle}>
            Connect with athletes, share achievements, and grow together
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#666666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search posts, users, or topics..."
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#666666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Selector */}
        <View style={styles.categorySection}>
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
                  <IconComponent 
                    size={18} 
                    color={selectedCategory === category.id ? '#FFFFFF' : '#666666'} 
                  />
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

        {/* Active Challenges */}
        <View style={styles.challengesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACTIVE CHALLENGES</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.challengesContainer}
            contentContainerStyle={styles.challengesContent}
          >
            {challenges.map((challenge) => {
              const IconComponent = challenge.icon;
              return (
                <TouchableOpacity key={challenge.id} style={styles.challengeCard}>
                  <View style={[styles.challengeIcon, { backgroundColor: challenge.color }]}>
                    <IconComponent size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  <View style={styles.challengeStats}>
                    <View style={styles.challengeStat}>
                      <Users size={12} color="#666666" />
                      <Text style={styles.challengeStatText}>{challenge.participants}</Text>
                    </View>
                    <Text style={styles.challengeReward}>{challenge.reward}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Community Posts */}
        <View style={styles.postsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT POSTS</Text>
            <TouchableOpacity style={styles.createPostButton}>
              <Plus size={16} color="#FFFFFF" />
              <Text style={styles.createPostText}>Create Post</Text>
            </TouchableOpacity>
          </View>

          {communityPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>{post.user.avatar}</Text>
                  </View>
                  <View style={styles.userDetails}>
                    <View style={styles.userNameContainer}>
                      <Text style={styles.userName}>{post.user.name}</Text>
                      {post.user.verified && (
                        <Star size={12} color="#FFD700" />
                      )}
                    </View>
                    <Text style={styles.userRank}>Rank #{post.user.rank}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={20} color="#666666" />
                </TouchableOpacity>
              </View>

              <View style={styles.postContent}>
                <Text style={styles.postText}>{post.content}</Text>
                <View style={styles.postTags}>
                  {post.tags.map((tag, index) => (
                    <View key={index} style={styles.postTag}>
                      <Text style={styles.postTagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.postActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleLike(post.id)}
                >
                  <Heart size={16} color="#666666" />
                  <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleComment(post.id)}
                >
                  <MessageCircle size={16} color="#666666" />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleShare(post.id)}
                >
                  <Share size={16} color="#666666" />
                  <Text style={styles.actionText}>{post.shares}</Text>
                </TouchableOpacity>
                <Text style={styles.postTimestamp}>{post.timestamp}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>JOIN THE CONVERSATION</Text>
          <Text style={styles.ctaSubtitle}>
            Share your achievements and connect with fellow athletes
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>SHARE YOUR STORY</Text>
            <Plus size={20} color="#FFFFFF" />
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
  searchSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  filterButton: {
    padding: 4,
  },
  categorySection: {
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryContainer: {
    paddingLeft: 24,
  },
  categoryContent: {
    paddingRight: 24,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  selectedCategoryCard: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  challengesSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '600',
  },
  challengesContainer: {
    paddingLeft: 0,
  },
  challengesContent: {
    paddingRight: 24,
  },
  challengeCard: {
    width: 200,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  challengeStatText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  challengeReward: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '600',
  },
  postsSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5F5F5',
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  createPostText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },
  userDetails: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  userRank: {
    fontSize: 12,
    color: '#666666',
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    marginBottom: 16,
  },
  postText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 12,
  },
  postTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  postTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  postTagText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#999999',
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