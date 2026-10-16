import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { Reservation } from '../types/models'
import { loadFromStorage, saveToStorage } from '../services/storage'