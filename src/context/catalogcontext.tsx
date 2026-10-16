import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { Materiel, MaterielFormValues } from '../types/models'
import { INITIAL_MATERIELS } from '../data/initialData'
import { loadFromStorage, saveToStorage } from '../services/storage'