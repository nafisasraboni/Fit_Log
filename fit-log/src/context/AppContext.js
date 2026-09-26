'use client';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [planList, setPlanList] = useState([]);
  const [savedList, setSavedList] = useState([]);

  // LocalStorage থেকে ডাটা লোড করা (পেজ রিলোড করলেও ডাটা থাকবে)
  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem('fitlog_plan')) || [];
    const savedItems = JSON.parse(localStorage.getItem('fitlog_saved')) || [];
    setPlanList(savedPlan);
    setSavedList(savedItems);
  }, []);

  // ডাটা আপডেট হলে LocalStorage-এ সেভ করা
  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(planList));
    localStorage.setItem('fitlog_saved', JSON.stringify(savedList));
  }, [planList, savedList]);

  const addToPlan = (workout) => {
    if (planList.length >= 5) {
      toast.error("You can only add up to 5 workouts for today!");
      return;
    }
    if (!planList.find((item) => item.id === workout.id)) {
      setPlanList([...planList, workout]);
      toast.success("Added to today's plan");
    } else {
      toast.info("Already in today's plan");
    }
  };

  const addToSaved = (workout) => {
    if (!savedList.find((item) => item.id === workout.id)) {
      setSavedList([...savedList, workout]);
      toast.success("Saved for later");
    } else {
      toast.info("Already saved");
    }
  };

  const removeFromPlan = (id) => {
    setPlanList(planList.filter((item) => item.id !== id));
    toast.success("Removed from plan");
  };

  return (
    <AppContext.Provider value={{ planList, savedList, addToPlan, addToSaved, removeFromPlan }}>
      {children}
    </AppContext.Provider>
  );
};