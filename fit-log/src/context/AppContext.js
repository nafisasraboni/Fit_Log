'use client';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [planList, setPlanList] = useState([]);
  const [savedList, setSavedList] = useState([]);

  // LocalStorage theke data load kora
  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem('fitlog_plan')) || [];
    const savedItems = JSON.parse(localStorage.getItem('fitlog_saved')) || [];
    setPlanList(savedPlan);
    setSavedList(savedItems);
  }, []);

  // Data update hole LocalStorage-e save kora
  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(planList));
    localStorage.setItem('fitlog_saved', JSON.stringify(savedList));
  }, [planList, savedList]);

  const addToPlan = (workout) => {
    if (planList.length >= 5) {
      toast.error("Cap of five lifts reached for today!");
      return;
    }
    const workoutId = String(workout.id || workout._id);
    const exists = planList.some((item) => String(item.id || item._id) === workoutId);

    if (!exists) {
      setPlanList([...planList, workout]);
      toast.success("Added to today's plan");
    } else {
      toast.info("Already in today's plan");
    }
  };

  const addToSaved = (workout) => {
    const workoutId = String(workout.id || workout._id);
    const exists = savedList.some((item) => String(item.id || item._id) === workoutId);

    if (!exists) {
      setSavedList([...savedList, workout]);
      toast.success("Saved for later");
    } else {
      toast.info("Already saved");
    }
  };

  const removeFromPlan = (id) => {
    setPlanList(planList.planList || planList.filter((item) => String(item.id || item._id) !== String(id)));
    setPlanList(prev => prev.filter((item) => String(item.id || item._id) !== String(id)));
    toast.error("Removed from plan");
  };

  const removeFromSaved = (id) => {
    setSavedList(prev => prev.filter((item) => String(item.id || item._id) !== String(id)));
    toast.error("Removed from saved");
  };

  return (
    <AppContext.Provider value={{ planList, savedList, addToPlan, addToSaved, removeFromPlan, removeFromSaved }}>
      {children}
    </AppContext.Provider>
  );
};