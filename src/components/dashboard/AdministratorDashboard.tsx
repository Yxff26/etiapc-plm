import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Settings, 
  Shield, 
  BarChart,
  UserPlus,
  Activity
} from "lucide-react";

export default function AdministratorDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">
              Profesores: 25 | Coordinadores: 8 | Administradores: 2
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actividad del Sistema</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              Tiempo de actividad del sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seguridad</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">
              Sistema actualizado y seguro
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evaluaciones Totales</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">
              Total de evaluaciones realizadas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nuevos Usuarios</p>
                  <p className="text-sm text-muted-foreground">3 usuarios pendientes de aprobación</p>
                </div>
                <Button variant="outline" size="sm">Gestionar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Roles y Permisos</p>
                  <p className="text-sm text-muted-foreground">Configurar permisos del sistema</p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Parámetros de Evaluación</p>
                  <p className="text-sm text-muted-foreground">Configurar criterios y rubros</p>
                </div>
                <Button variant="outline" size="sm">Editar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reportes y Estadísticas</p>
                  <p className="text-sm text-muted-foreground">Generar reportes del sistema</p>
                </div>
                <Button variant="outline" size="sm">Generar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 