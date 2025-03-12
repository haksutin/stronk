import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Card, CardContent } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useNavigate } from "react-router";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

function TrainingChart({ workouts }) {
  const [selectedView, setSelectedView] = useState("Year");
  const navigate = useNavigate();

  const now = new Date();
  const currentMonthIndex = now.getMonth();
  const currentYear = now.getFullYear();

  const months = [];
  const monthlyWorkoutCount = Array(12).fill(0);

  for (let i = 0; i < 12; i++) {
    let monthDate = new Date(currentYear, currentMonthIndex - i, 1);
    let monthName = monthDate.toLocaleString('default', { month: 'short' });
    months.unshift(monthName);
  }

  // vuosi
  workouts.forEach(workout => {
    const workoutDate = new Date(workout.date);
    const workoutMonthIndex = workoutDate.getMonth();
    const workoutYear = workoutDate.getFullYear();

    let monthDiff = (currentYear - workoutYear) * 12 + (currentMonthIndex - workoutMonthIndex);
    if (monthDiff >= 0 && monthDiff < 12) {
      monthlyWorkoutCount[11 - monthDiff] += 1;
    }
  });

  // kuukausi
  const currentMonth = now.toLocaleString('default', { month: 'short' });
  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  const weeksInMonth = Math.ceil(daysInMonth / 7);
  const weekLabels = Array.from({ length: weeksInMonth }, (_, i) => `Week ${i + 1}`);
  const weeklyData = Array(weeksInMonth).fill(0);

  workouts.forEach(workout => {
    const workoutDate = new Date(workout.date);
    if (workoutDate.getMonth() === currentMonthIndex && workoutDate.getFullYear() === currentYear) {
      const day = workoutDate.getDate();
      const weekIndex = Math.floor((day - 1) / 7);
      weeklyData[weekIndex] += 1;
    }
  });

  const totalWorkouts = workouts.filter(workout => new Date(workout.date).getFullYear() === currentYear).length;

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2, textAlign: "center", backgroundColor: "#333" }}>
      <CardContent>
        <Box
          component="img"
          src="pictures/STRONK_white.png"
          alt="Logo"
          sx={{ height: 140, margin: "auto", mb: 0 }}
        />
        <Typography variant="h4" color="white" sx={{ mb: 1 }}>
          STRONK
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }}>
          LIFT WEIGHTS, GET STRONK
        </Typography>

        <Typography variant="h5" sx={{ mb: 5 }}>
          Olet tehnyt {totalWorkouts} treeniä tänä vuonna!🔥
        </Typography>

        {/* vuosi / kuukausi */}
        <Tabs value={selectedView} onChange={(e, newValue) => setSelectedView(newValue)}
          sx={{ mt: 2, width: "100%", display: "flex", justifyContent: "center" }}
          textColor="inherit"
          indicatorColor="secondary">
          <Tab label="Vuosi" value="Year"
            sx={{
              flex: 1, textAlign: "center", color: selectedView === "Year" ? "white" : "gray",
              fontWeight: selectedView === "Year" ? "bold" : "normal"
            }} />
          <Tab label="Kuluva kuukausi" value="Month"
            sx={{
              flex: 1,
              textAlign: "center",
              color: selectedView === "Month" ? "white" : "gray",
              fontWeight: selectedView === "Month" ? "bold" : "normal"
            }}
          />
        </Tabs>

        {/* kaavio */}
        <Box sx={{ width: "100%", height: 300, mt: 2, borderRadius: 2, p: 2 }}>
          {selectedView === "Year" ? (
            <LineChart
              xAxis={[{ scaleType: "point", data: months }]}
              series={[{ data: monthlyWorkoutCount, label: "Treenit per kuukausi" }]}
              width={500}
              height={300}
            />
          ) : (
            <LineChart
              xAxis={[{ scaleType: "point", data: weekLabels }]}
              series={[{ data: weeklyData, label: `Treenit ${currentMonth}` }]}
              width={500}
              height={300}
            />
          )}
        </Box>
      </CardContent>

      {/*  floating nappi */}
      <Tooltip title="Add Workout" arrow>
        <Fab color="secondary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => navigate('/add')}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Card>
  );
}

export default TrainingChart;
