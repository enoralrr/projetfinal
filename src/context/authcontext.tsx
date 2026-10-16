import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '../types/models'
import { DEMO_USERS } from '../data/initialData'
import { loadFromStorage, saveToStorage, removeFromStorage } from '../services/storage'