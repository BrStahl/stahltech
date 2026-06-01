import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "./firebase";

let cachedAccessToken: string | null = null;

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets.readonly');

export const googleSheetsSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }
    
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const getSheetsAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const fetchSpreadsheetMetadata = async (spreadsheetId: string) => {
  const token = getSheetsAccessToken();
  if (!token) throw new Error("Sem token de acesso. Por favor, conecte-se com o Google.");

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!res.ok) {
    throw new Error(`Erro na API (${res.status}): Acesso Negado ou Planilha não encontrada.`);
  }
  
  return await res.json();
};

export const fetchSheetData = async (spreadsheetId: string, range: string) => {
  const token = getSheetsAccessToken();
  if (!token) throw new Error("Sem token de acesso. Por favor, conecte-se com o Google.");

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!res.ok) {
    throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
  }
  
  return await res.json();
};
