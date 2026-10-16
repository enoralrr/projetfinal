import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import RequireRole from './guards/RequireRole'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import CataloguePage from './pages/CataloguePage'
import MaterielDetailPage from './pages/MaterielDetailPage'
import MesReservationsPage from './pages/MesReservationsPage'
import AccesRefusePage from './pages/AccesRefusePage'
import NotFoundPage from './pages/NotFoundPage'

const GestionPage = lazy(() => import('./pages/gestion/GestionPage'))
const NouveauMaterielPage = lazy(() => import('./pages/gestion/NouveauMaterielPage'))
const ModifierMaterielPage = lazy(() => import('./pages/gestion/ModifierMaterielPage'))