import jwt from "jsonwebtoken";
import { config } from "../config.js";
import prisma from "../database.js";
import * as argon2 from "argon2";

export async function requireLogin(req, res, next) {
  if (req.get("Authorization")) {
    const token = req.get("Authorization").split(" ")[1];
    try {
      jwt.verify(token, config.secret);
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function has_admin(req, res, next) {
  prisma.user.findMany().then((users) => {
    if (users.length === 0) {
      next();
    } else {
      res.status(400).json({ message: "มี Admin ในระบบแล้ว" });
    }
  });
}

export async function checkOldpassWord(req, res, next) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  const validPassword = await argon2.verify(
    user.password,
    req.body.oldPassword
  );
  if (validPassword) {
    next();
  } else {
    res.status(400).json({ message: "รหัสผ่านเดิมไม่ถูกต้อง" });
  }
}
