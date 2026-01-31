"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// --- Components ---

const DynamicChart = ({ data, type = 'bar' }: { data: any[], type?: string }) => {
  return (
    <div className="h-[200px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
          />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const DynamicForm = ({ fields }: { fields: any[] }) => {
  return (
    <Card className="p-4 mt-4 space-y-3 bg-muted/30">
      {fields.map((field: any) => (
        <div key={field.name} className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
          <Input type={field.type} placeholder={`Enter ${field.label.toLowerCase()}`} />
        </div>
      ))}
      <Button size="sm" className="w-full">Submit</Button>
    </Card>
  );
};

const WeatherWidget = ({ location, temp, condition }: any) => {
  return (
    <Card className="p-4 mt-4 flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
      <div>
        <div className="text-lg font-bold">{location}</div>
        <div className="text-sm text-muted-foreground">{condition}</div>
      </div>
      <div className="text-3xl font-light">{temp}°</div>
    </Card>
  );
};

// --- Registry ---

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  'Chart': DynamicChart,
  'Form': DynamicForm,
  'Weather': WeatherWidget
};

export function renderGenerativeComponent(componentName: string, props: any) {
  const Component = componentRegistry[componentName];
  if (!Component) return null;
  return <Component {...props} />;
}
