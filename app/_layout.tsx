import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '../hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = () => {
      // In a real app, check for stored auth token
      const hasAuth = false; // Change to true to skip login
      setIsAuthenticated(hasAuth);
    };
    
    checkAuth();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="login" />
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}