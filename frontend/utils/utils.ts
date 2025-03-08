import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDocument(document: string): string {
  const cleanDoc = document.replace(/\D/g, "");

  if (cleanDoc.length === 11) {
    // Format CPF: 123.456.789-01
    return cleanDoc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (cleanDoc.length === 14) {
    // Format CNPJ: 12.345.678/0001-90
    return cleanDoc.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return document;
}

export function validateCPF(cpf: string): boolean {
  // Remove non-numeric characters
  cpf = cpf.replace(/\D/g, "");

  // Check if it has 11 digits
  if (cpf.length !== 11) return false;

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== Number.parseInt(cpf.charAt(9))) return false;

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== Number.parseInt(cpf.charAt(10))) return false;

  return true;
}

export function validateCNPJ(cnpj: string): boolean {
  // Remove non-numeric characters
  cnpj = cnpj.replace(/\D/g, "");

  // Check if it has 14 digits
  if (cnpj.length !== 14) return false;

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Validate first check digit
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += Number.parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number.parseInt(digits.charAt(0))) return false;

  // Validate second check digit
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += Number.parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number.parseInt(digits.charAt(1))) return false;

  return true;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
