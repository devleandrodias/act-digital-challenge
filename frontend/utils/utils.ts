import { twMerge } from "tailwind-merge";

import { cnpj, cpf } from "cpf-cnpj-validator";

import { clsx, type ClassValue } from "clsx";

export function formatDocument(document: string): string {
  const cleanDoc = document.replace(/\D/g, "");

  if (cleanDoc.length === 11) {
    return cpf.format(cleanDoc);
  }

  if (cleanDoc.length === 14) {
    return cnpj.format(cleanDoc);
  }

  return document;
}

export function validateDocument(document: string): string {
  const cleanDoc = document.replace(/\D/g, "");

  if (cleanDoc.length === 11) {
    return validateCPF(cleanDoc) ? "" : "CPF inválido";
  }

  if (cleanDoc.length === 14) {
    return validateCNPJ(cleanDoc) ? "" : "CNPJ inválido";
  }

  return "Documento inválido";
}

export function validateCPF(document: string): boolean {
  return cpf.isValid(document);
}

export function validateCNPJ(document: string): boolean {
  return cnpj.isValid(document);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
